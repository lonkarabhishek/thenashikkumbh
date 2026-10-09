-- Spend protection counters for the Kumbh Sahayak AI assistant.
-- Applied to the Supabase project named in SUPABASE_URL. The site calls only
-- the two functions below through PostgREST with the publishable key; the
-- table itself is not readable or writable by that key.

create schema if not exists kumbh_ai;

create table if not exists kumbh_ai.counters (
  bucket      text primary key,
  count       integer not null default 0,
  cost_micros bigint  not null default 0,
  updated_at  timestamptz not null default now()
);

alter table kumbh_ai.counters enable row level security;
-- No policies on purpose: anon and authenticated cannot touch the table directly.

-- Reserve one request. Returns {"allowed": true} or {"allowed": false, "reason": ...}.
create or replace function kumbh_ai.ai_take(
  p_visitor text,
  p_day text,
  p_minute text,
  p_est_micros bigint,
  p_day_cap_micros bigint,
  p_visitor_day_cap integer,
  p_minute_cap integer
) returns json
language plpgsql
security definer
set search_path = kumbh_ai, pg_temp
as $$
declare
  v_minute integer;
  v_day integer;
  v_spend bigint;
begin
  -- Opportunistic cleanup; buckets older than two days are useless.
  delete from counters where updated_at < now() - interval '2 days';

  insert into counters (bucket, count) values ('m:' || p_visitor || ':' || p_minute, 1)
    on conflict (bucket) do update set count = counters.count + 1, updated_at = now()
    returning count into v_minute;
  if v_minute > p_minute_cap then
    return json_build_object('allowed', false, 'reason', 'visitor_minute');
  end if;

  insert into counters (bucket, count) values ('v:' || p_visitor || ':' || p_day, 1)
    on conflict (bucket) do update set count = counters.count + 1, updated_at = now()
    returning count into v_day;
  if v_day > p_visitor_day_cap then
    return json_build_object('allowed', false, 'reason', 'visitor_day');
  end if;

  insert into counters (bucket, count, cost_micros) values ('day:' || p_day, 1, p_est_micros)
    on conflict (bucket) do update
      set count = counters.count + 1,
          cost_micros = counters.cost_micros + p_est_micros,
          updated_at = now()
    returning cost_micros into v_spend;
  if v_spend > p_day_cap_micros then
    return json_build_object('allowed', false, 'reason', 'daily_cap');
  end if;

  return json_build_object('allowed', true);
end;
$$;

-- Replace the estimate with the real cost once the answer has streamed.
create or replace function kumbh_ai.ai_settle(p_day text, p_delta_micros bigint)
returns void
language sql
security definer
set search_path = kumbh_ai, pg_temp
as $$
  update counters
     set cost_micros = greatest(0, cost_micros + p_delta_micros), updated_at = now()
   where bucket = 'day:' || p_day;
$$;

revoke all on schema kumbh_ai from public;
grant usage on schema kumbh_ai to anon, authenticated, service_role;
revoke all on kumbh_ai.counters from anon, authenticated;
grant execute on function kumbh_ai.ai_take(text, text, text, bigint, bigint, integer, integer) to anon, authenticated;
grant execute on function kumbh_ai.ai_settle(text, bigint) to anon, authenticated;
