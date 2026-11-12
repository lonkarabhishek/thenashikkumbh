import assert from "node:assert/strict";
import { test } from "node:test";
import { majorMelaPeriod, schedule } from "@/data/verified";
import {
  amritPhrase,
  assessDay,
  bathingDays,
  clipMonthToMela,
  defaultMonthIndex,
  isRealIso,
  leadAnswer,
  melaCeremonies,
  melaMonths,
  nearestBathing,
  nashikParvaDates,
  summarizeRange,
} from "./dayPicker";

test("bathing days are the schedule Amrit Snans plus the three named Nashik parva days", () => {
  const amrit = schedule.filter((event) => event.isAmritSnan).map((event) => event.isoDate).sort();
  const fromPicker = bathingDays().filter((day) => day.kind === "amrit").map((day) => day.isoDate).sort();
  assert.deepEqual(fromPicker, amrit);
  assert.deepEqual(nashikParvaDates(), ["2027-08-12", "2027-08-17", "2027-08-28"]);
  assert.deepEqual(
    bathingDays().map((day) => day.isoDate),
    ["2027-08-02", "2027-08-12", "2027-08-17", "2027-08-28", "2027-08-31", "2027-09-11", "2027-09-12"]
  );
});

test("third Amrit Snan is Nashik on 11 September and Trimbakeshwar on 12 September", () => {
  const nashik = bathingDays().find((day) => day.id === "amrit-snan-3-nashik");
  const trimbak = bathingDays().find((day) => day.id === "amrit-snan-3-trimbak");
  assert.equal(nashik?.isoDate, "2027-09-11");
  assert.deepEqual(nashik?.places, ["nashik"]);
  assert.equal(trimbak?.isoDate, "2027-09-12");
  assert.deepEqual(trimbak?.places, ["trimbak"]);
  const shared = bathingDays().filter((day) => day.kind === "amrit" && day.places.length === 2);
  assert.deepEqual(shared.map((day) => day.isoDate), ["2027-08-02", "2027-08-31"]);
});

test("ceremonies inside the major mela are only the Sadhugram flag and Nagar Pradakshina", () => {
  assert.deepEqual(
    melaCeremonies().map((day) => [day.id, day.isoDate, day.places.join("+")]),
    [
      ["sadhugram-dhwajarohan", "2027-07-24", "nashik"],
      ["nagar-pradakshina", "2027-07-29", "nashik"],
    ]
  );
});

test("colours follow intent and place, and do not rate days outside the main mela", () => {
  assert.equal(assessDay("2027-06-14", "either", "quiet").kind, "outside");
  assert.equal(assessDay("2027-06-14", "either", "quiet").band, null);
  assert.equal(assessDay("2027-06-15", "either", "quiet").band, "green");
  assert.equal(assessDay("2027-09-30", "nashik", "quiet").band, "green");
  assert.equal(assessDay("2027-10-01", "nashik", "quiet").band, null);

  assert.equal(assessDay("2027-09-11", "nashik", "snan").band, "green");
  assert.equal(assessDay("2027-09-11", "nashik", "quiet").band, "red");
  assert.equal(assessDay("2027-09-11", "nashik", "elderly").band, "red");
  assert.equal(assessDay("2027-09-11", "trimbak", "quiet").reason, "quiet-elsewhere");
  assert.equal(assessDay("2027-09-11", "trimbak", "snan").band, "amber");

  assert.equal(assessDay("2027-09-12", "trimbak", "snan").band, "green");
  assert.equal(assessDay("2027-09-12", "nashik", "quiet").reason, "quiet-elsewhere");

  assert.equal(assessDay("2027-08-17", "nashik", "quiet").reason, "quiet-parva");
  assert.equal(assessDay("2027-08-17", "nashik", "snan").reason, "snan-parva");
  assert.equal(assessDay("2027-08-17", "trimbak", "quiet").band, "green");
  assert.equal(assessDay("2027-08-17", "trimbak", "snan").reason, "snan-ordinary");
  assert.equal(assessDay("2027-08-17", "either", "quiet").reason, "quiet-parva");

  assert.equal(assessDay("2027-07-29", "either", "quiet").reason, "quiet-ceremony");
  assert.equal(assessDay("2027-07-29", "trimbak", "quiet").band, "green");
  assert.equal(assessDay("2027-08-03", "nashik", "snan").band, "red");
  assert.equal(assessDay("2027-08-03", "nashik", "elderly").band, "green");
  assert.equal(assessDay("not-a-date", "nashik", "quiet").band, null);
  assert.equal(isRealIso("2027-02-31"), false);
});

test("nearest bathing days stay on the verified list and prefer the chosen place", () => {
  const nashik = nearestBathing("2027-08-20", "nashik", 3).map((row) => [row.day.isoDate, row.delta]);
  assert.deepEqual(nashik, [
    ["2027-08-17", -3],
    ["2027-08-28", 8],
    ["2027-08-12", -8],
  ]);
  const trimbak = nearestBathing("2027-08-20", "trimbak", 3).map((row) => row.day.isoDate);
  assert.deepEqual(trimbak, ["2027-08-31", "2027-08-02", "2027-09-12"]);
  assert.equal(nearestBathing("2027-08-02", "either", 1)[0]?.delta, 0);
});

test("month clip and range summary use the major mela bounds", () => {
  assert.deepEqual(melaMonths(), [
    { year: 2027, month: 6 },
    { year: 2027, month: 7 },
    { year: 2027, month: 8 },
    { year: 2027, month: 9 },
  ]);
  assert.equal(melaMonths()[defaultMonthIndex()]?.month, 8);
  assert.deepEqual(clipMonthToMela(2027, 6), { from: majorMelaPeriod.startIso, to: "2027-06-30" });
  assert.deepEqual(clipMonthToMela(2027, 9), { from: "2027-09-01", to: majorMelaPeriod.endIso });

  const july = summarizeRange("2027-07-01", "2027-07-31", "either", "quiet");
  assert.ok(!("error" in july));
  if ("error" in july) return;
  assert.deepEqual(july.red, []);
  assert.deepEqual(july.amber, ["2027-07-24", "2027-07-29"]);

  const august = summarizeRange("2027-08-01", "2027-08-31", "nashik", "snan");
  assert.ok(!("error" in august));
  if ("error" in august) return;
  assert.deepEqual(august.green, ["2027-08-02", "2027-08-31"]);
  assert.deepEqual(august.amber, ["2027-08-12", "2027-08-17", "2027-08-28"]);

  assert.deepEqual(summarizeRange("2027-08-10", "2027-08-01", "either", "quiet"), { error: "order" });
});

test("the public answer names only schedule dates", () => {
  const en = leadAnswer("en");
  assert.match(en, /2 August 2027 \(Nashik and Trimbakeshwar\)/);
  assert.match(en, /31 August 2027 \(Nashik and Trimbakeshwar\)/);
  assert.match(en, /11 September 2027 \(Nashik\)/);
  assert.match(en, /12 September 2027 \(Trimbakeshwar\)/);
  assert.match(en, /12 August 2027, 17 August 2027 and 28 August 2027/);
  assert.match(en, /not a crowd forecast/);
  assert.match(amritPhrase("mr"), /२ ऑगस्ट २०२७/);
  assert.doesNotMatch(en, /August 20,? 2027|September 3,? 2027|September 17,? 2027|October 2,? 2027|October 17,? 2027/);
});
