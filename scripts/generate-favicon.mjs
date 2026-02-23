import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "src", "app");

// Om symbol SVG using a path (renders everywhere, no font dependency)
const omSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="64" fill="#0D0906"/>
  <circle cx="256" cy="256" r="230" fill="none" stroke="rgba(255,215,0,0.12)" stroke-width="2"/>
  <g transform="translate(256,280)" text-anchor="middle">
    <text font-size="360" font-family="serif" fill="#FFD700" dominant-baseline="central" text-anchor="middle" x="0" y="-20">&#x950;</text>
  </g>
</svg>`;

// Generate multiple sizes
async function generate() {
  const svgBuffer = Buffer.from(omSvg);

  // favicon.ico (32x32) - ICO format via PNG
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();

  // Create ICO file (simple ICO with one 32x32 PNG entry)
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);     // reserved
  icoHeader.writeUInt16LE(1, 2);     // type: 1 = ICO
  icoHeader.writeUInt16LE(1, 4);     // count: 1 image

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(32, 0);        // width
  icoEntry.writeUInt8(32, 1);        // height
  icoEntry.writeUInt8(0, 2);         // color palette
  icoEntry.writeUInt8(0, 3);         // reserved
  icoEntry.writeUInt16LE(1, 4);      // color planes
  icoEntry.writeUInt16LE(32, 6);     // bits per pixel
  icoEntry.writeUInt32LE(png32.length, 8);  // size of PNG data
  icoEntry.writeUInt32LE(22, 12);    // offset (6 header + 16 entry = 22)

  const ico = Buffer.concat([icoHeader, icoEntry, png32]);
  writeFileSync(join(appDir, "favicon.ico"), ico);
  console.log("Created favicon.ico (32x32)");

  // icon.png (192x192 for modern browsers)
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  writeFileSync(join(appDir, "icon.png"), png192);
  console.log("Created icon.png (192x192)");

  // apple-icon.png (180x180 for Apple devices)
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  writeFileSync(join(appDir, "apple-icon.png"), png180);
  console.log("Created apple-icon.png (180x180)");

  console.log("All favicons generated.");
}

generate().catch(console.error);
