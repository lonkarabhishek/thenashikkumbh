/**
 * One-page PDF that paints a JPEG. Built in the browser so a family card can
 * be downloaded without sending the image (or the names on it) anywhere.
 */

/** Copy into a fresh ArrayBuffer. TS 5.7 treats Uint8Array buffers as ArrayBufferLike. */
function bytes(data: Uint8Array): Uint8Array<ArrayBuffer> {
  const out = new Uint8Array(data.byteLength);
  out.set(data as unknown as Uint8Array<ArrayBuffer>);
  return out;
}

function concat(parts: Uint8Array[]): Uint8Array {
  const copies = parts.map(bytes);
  const len = copies.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(len);
  let offset = 0;
  for (const part of copies) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

const enc = new TextEncoder();

function obj(n: number, dict: string, stream?: Uint8Array): Uint8Array {
  const parts = [enc.encode(`${n} 0 obj\n${dict}`)];
  if (stream) {
    parts.push(enc.encode("\nstream\n"), bytes(stream), enc.encode("\nendstream"));
  }
  parts.push(enc.encode("\nendobj\n"));
  return concat(parts);
}

export function jpegToPdf(jpeg: Uint8Array, imgW: number, imgH: number): Uint8Array {
  if (imgW < 1 || imgH < 1) throw new Error("bad image size");
  const pageW = 595.28;
  const pageH = 841.89;
  const margin = 36;
  const scale = Math.min((pageW - margin * 2) / imgW, (pageH - margin * 2) / imgH);
  const w = +(imgW * scale).toFixed(2);
  const h = +(imgH * scale).toFixed(2);
  const x = +((pageW - w) / 2).toFixed(2);
  const y = +((pageH - h) / 2).toFixed(2);
  const content = enc.encode(`q\n${w} 0 0 ${h} ${x} ${y} cm\n/Im0 Do\nQ\n`);

  const objects = [
    obj(1, "<< /Type /Catalog /Pages 2 0 R >>"),
    obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>"),
    obj(
      3,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents 4 0 R /Resources << /XObject << /Im0 5 0 R >> >> >>`
    ),
    obj(4, `<< /Length ${content.length} >>`, content),
    obj(
      5,
      `<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>`,
      jpeg
    ),
  ];

  const header = concat([enc.encode("%PDF-1.3\n"), Uint8Array.from([0xff, 0xff, 0xff, 0xff]), enc.encode("\n")]);
  const chunks: Uint8Array[] = [header];
  const offsets = [0];
  let pos = header.length;
  for (const object of objects) {
    offsets.push(pos);
    chunks.push(object);
    pos += object.length;
  }
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${pos}\n%%EOF\n`;
  chunks.push(enc.encode(xref));
  return concat(chunks);
}
