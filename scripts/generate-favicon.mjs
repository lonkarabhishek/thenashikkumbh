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

  // Create ICO file with two entries: 48x48 + 32x32 (Google needs 48x48 minimum)
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);     // reserved
  icoHeader.writeUInt16LE(1, 2);     // type: 1 = ICO
  icoHeader.writeUInt16LE(2, 4);     // count: 2 images

  const dataOffset = 6 + 16 * 2;     // header + 2 entries = 38

  const entry48 = Buffer.alloc(16);
  entry48.writeUInt8(48, 0);         // width
  entry48.writeUInt8(48, 1);         // height
  entry48.writeUInt8(0, 2);          // color palette
  entry48.writeUInt8(0, 3);          // reserved
  entry48.writeUInt16LE(1, 4);       // color planes
  entry48.writeUInt16LE(32, 6);      // bits per pixel
  entry48.writeUInt32LE(png48.length, 8);
  entry48.writeUInt32LE(dataOffset, 12);

  const entry32 = Buffer.alloc(16);
  entry32.writeUInt8(32, 0);         // width
  entry32.writeUInt8(32, 1);         // height
  entry32.writeUInt8(0, 2);          // color palette
  entry32.writeUInt8(0, 3);          // reserved
  entry32.writeUInt16LE(1, 4);       // color planes
  entry32.writeUInt16LE(32, 6);      // bits per pixel
  entry32.writeUInt32LE(png32.length, 8);
  entry32.writeUInt32LE(dataOffset + png48.length, 12);

  const ico = Buffer.concat([icoHeader, entry48, entry32, png48, png32]);
  writeFileSync(join(appDir, "favicon.ico"), ico);
  console.log("Created favicon.ico (48x48 + 32x32)");

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
