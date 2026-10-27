import assert from "node:assert/strict";
import { test } from "node:test";
import QRCode from "qrcode";
import { buildFamilyCard, normalizePhone } from "./familyCard";
import { jpegToPdf } from "./jpegPdf";

test("normalizePhone turns a 10-digit Indian mobile into +91", () => {
  assert.equal(normalizePhone("9876543210"), "+919876543210");
  assert.equal(normalizePhone("+91 98765-43210"), "+919876543210");
  assert.equal(normalizePhone("09876543210"), "+919876543210");
  assert.equal(normalizePhone("919876543210"), "+919876543210");
});

test("normalizePhone keeps an explicit international number", () => {
  assert.equal(normalizePhone("+1 (415) 555-2671"), "+14155552671");
});

test("normalizePhone rejects numbers that are not dialable", () => {
  assert.equal(normalizePhone(""), null);
  assert.equal(normalizePhone("   "), null);
  assert.equal(normalizePhone("12345"), null);
  assert.equal(normalizePhone("abcdefghij"), null);
  assert.equal(normalizePhone("1234567890123456"), null);
});

test("buildFamilyCard requires a name and a dialable phone", () => {
  const missing = buildFamilyCard({ name: "  ", phone: "9876543210" }, "en");
  assert.equal(missing.card, null);
  assert.deepEqual(missing.errors, ["name"]);

  const badPhone = buildFamilyCard({ name: "Meera", phone: "12" }, "mr");
  assert.equal(badPhone.card, null);
  assert.deepEqual(badPhone.errors, ["phone"]);
});

test("buildFamilyCard trims fields and drops control characters", () => {
  const { card, errors } = buildFamilyCard(
    { name: "  मीरा\nजोशी  ", phone: "98765 43210", stay: "खोली\t4", meeting: " वडाचे झाड ", note: "लाल\u0000पट्टा" },
    "mr"
  );
  assert.deepEqual(errors, []);
  assert.ok(card);
  assert.equal(card.name, "मीरा जोशी");
  assert.equal(card.stay, "खोली 4");
  assert.equal(card.meeting, "वडाचे झाड");
  assert.equal(card.note, "लाल पट्टा");
  assert.equal(card.phone, "+919876543210");
  assert.equal(card.phoneDisplay, "+91 98765 43210");
});

test("QR text is name, phone and meeting point only", () => {
  const { card } = buildFamilyCard(
    { name: "मीरा", phone: "9876543210", meeting: "वडाचे झाड", stay: "पंचवटी", note: "गुप्त टीप" },
    "mr"
  );
  assert.equal(
    card?.qrText,
    ["खोया-पाया", "नाव: मीरा", "फोन: +919876543210", "भेट: वडाचे झाड"].join("\n")
  );
  assert.equal(card?.qrText.includes("पंचवटी"), false);
  assert.equal(card?.qrText.includes("गुप्त"), false);
});

test("QR text omits an empty meeting point", () => {
  const { card } = buildFamilyCard({ name: "Meera", phone: "9876543210" }, "en");
  assert.equal(card?.qrText, ["KHOYA-PAYA", "Name: Meera", "Call: +919876543210"].join("\n"));
});

test("Hindi QR labels stay in Hindi", () => {
  const { card } = buildFamilyCard({ name: "मीरा", phone: "9876543210", meeting: "वट वृक्ष" }, "hi");
  assert.equal(
    card?.qrText,
    ["खोया-पाया", "नाम: मीरा", "फोन: +919876543210", "मिलें: वट वृक्ष"].join("\n")
  );
});

test("long Devanagari fields are cut on character boundaries", () => {
  const name = "अ".repeat(80);
  const { card } = buildFamilyCard({ name, phone: "9876543210", meeting: "ब".repeat(80) }, "mr");
  assert.equal(Array.from(card?.name ?? "").length, 40);
  assert.equal(Array.from(card?.meeting ?? "").length, 48);
  assert.equal(card?.name.endsWith("अ"), true);
});

test("WhatsApp text carries the details and the tool link, not an empty stay line", () => {
  const { card } = buildFamilyCard({ name: "Meera", phone: "9876543210", meeting: "banyan tree", note: "red scarf" }, "en");
  const text = card?.whatsappText("https://www.thenashikkumbh.com/en/family-card") ?? "";
  assert.match(text, /Meera/);
  assert.match(text, /\+91 98765 43210/);
  assert.match(text, /banyan tree/);
  assert.match(text, /red scarf/);
  assert.match(text, /https:\/\/www\.thenashikkumbh\.com\/en\/family-card/);
  assert.equal(/\bstay\b/i.test(text), false);
  assert.match(text, /not uploaded/i);
});

test("a full Marathi card still fits in a QR code", async () => {
  const { card } = buildFamilyCard(
    { name: "अ".repeat(40), phone: "9876543210", meeting: "ब".repeat(48) },
    "mr"
  );
  const qr = QRCode.create(card!.qrText, { errorCorrectionLevel: "Q" });
  assert.ok(qr.modules.size >= 21);
  const png = await QRCode.toDataURL(card!.qrText, { errorCorrectionLevel: "Q", margin: 1 });
  assert.match(png, /^data:image\/png;base64,/);
});

test("jpegToPdf embeds the image and has a consistent xref", () => {
  const jpeg = Uint8Array.from([0xff, 0xd8, 0xff, 0xd9, 1, 2, 3, 4]);
  const pdf = jpegToPdf(jpeg, 1080, 1520);
  const text = new TextDecoder("latin1").decode(pdf);
  assert.equal(text.startsWith("%PDF-1.3"), true);
  assert.equal(text.trimEnd().endsWith("%%EOF"), true);
  assert.ok(text.includes("/DCTDecode"));
  const start = text.indexOf("startxref\n");
  const xrefAt = Number(text.slice(start + "startxref\n".length).split("\n")[0]);
  assert.equal(text.slice(xrefAt, xrefAt + 4), "xref");
  const body = text.slice(0, xrefAt);
  for (const n of [1, 2, 3, 4, 5]) {
    const marker = `${n} 0 obj`;
    const at = body.indexOf(marker);
    assert.ok(at > 0, marker);
    const line = text.split("\n").find((l) => l.includes(" n ") && l.startsWith(String(at).padStart(10, "0")));
    assert.ok(line, `xref entry for object ${n} at ${at}`);
  }
  const streamAt = findBytes(pdf, [0xff, 0xd8, 0xff, 0xd9, 1, 2, 3, 4]);
  assert.ok(streamAt > 0);
});

function findBytes(hay: Uint8Array, needle: number[]): number {
  outer: for (let i = 0; i <= hay.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) if (hay[i + j] !== needle[j]) continue outer;
    return i;
  }
  return -1;
}
