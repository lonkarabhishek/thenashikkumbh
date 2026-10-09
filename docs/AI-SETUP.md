# Kumbh Sahayak AI: setup and running costs

The chat assistant answers typed questions with Claude Haiku 5.5
(`claude-haiku-5-5`), grounded in this site's own content. Chip clicks and
quick replies still use the free built-in keyword engine. If the key is
missing, the daily budget is spent, or the API fails, the chat falls back to
the keyword engine and tells the reader.

## 1. Environment variables (Vercel: Project, Settings, Environment Variables)

| Name | Required | Default | What it does |
| --- | --- | --- | --- |
| `ANTHROPIC_API_KEY` | yes | none | The Anthropic API key. Mark it Sensitive. Without it the AI is off and the chat uses the keyword engine. |
| `AI_DAILY_CAP_USD` | no | `0.075` | Spend allowed per day in dollars. 0.075 a day is about 200 rupees a month. |
| `AI_VISITOR_DAY_CAP` | no | `25` | Messages one visitor may send per day. |
| `AI_VISITOR_MINUTE_CAP` | no | `5` | Messages one visitor may send per minute. |
| `AI_VISITOR_SALT` | no | empty | Any random string. Makes the visitor hash impossible to recompute from outside. |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` | no | none | Turns on shared counters (see section 3). Without them, counting is per server instance. |

Set them for Production (and Preview if you want the AI on preview URLs),
then redeploy.

## 2. Set a hard limit in the Anthropic Console

The per-day cap in this code is the first line of defence, but without
Supabase it counts per server instance, so a traffic spike can exceed it.
The hard stop is the spend limit in the Anthropic Console:
Settings, Limits, set a monthly spend limit (for example $3). When it is
reached the API returns errors and the chat falls back to the keyword
engine on its own.

## 3. Shared counters with Supabase (optional, recommended later)

Run `supabase/migrations/20261009_kumbh_ai_limits.sql` in the SQL editor of
a Supabase project, then set `SUPABASE_URL` (the project URL) and
`SUPABASE_PUBLISHABLE_KEY` (the publishable key) in Vercel. The site calls
two functions, `kumbh_ai.ai_take` and `kumbh_ai.ai_settle`, through
PostgREST. The counters table is not readable with the publishable key.

Nothing about the question or the answer is stored, in Supabase or
anywhere else. The counters hold a daily one-way hash per visitor and the
day's spend, and rows older than two days are deleted.

## 4. What one answer costs

Claude Haiku 5.5 list prices: $0.10 per million input tokens, $0.50 per
million output tokens. A request carries the rules (about 550 tokens), the
core facts (about 500 to 760 tokens depending on language) and the passages
that match the question (up to about 2,200 tokens), and answers in up to
500 tokens. A typical answer therefore costs about $0.0004 to $0.0006, so
the default $0.075 daily cap allows roughly 120 to 180 answers a day.

## 5. Changing what the assistant knows

It knows exactly what the site renders: `src/data/verified` (schedule,
helplines, announced and awaiting lists), `src/data/chatbotKnowledgeBase.ts`
(guide topics), `src/content/pages/*` (long-form pages) and every post in
`src/data/news` that has linked sources. Add or correct content there and the
assistant picks it up on the next deploy. The rules it follows are in
`src/lib/ai/prompt.ts`.
