import sharp from "sharp";
import fs from "fs";
import path from "path";

function findImages(dir) {
  let results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(findImages(full));
    } else if (/\.(jpg|jpeg|png)$/i.test(f)) {
      const webp = full.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      if (!fs.existsSync(webp)) {
        results.push(full);
      }
    }
  }
  return results;
}

const imgs = findImages("public/images");
for (const img of imgs) {
  const ext = path.extname(img);
  const out = img.replace(ext, ".webp");
  try {
    await sharp(img)
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(out);
    const o = fs.statSync(img).size;
    const n = fs.statSync(out).size;
    console.log(
      `${path.basename(img)}: ${Math.round(o / 1024)}K -> ${Math.round(n / 1024)}K`
    );
  } catch (e) {
    console.log(`skip ${path.basename(img)}: ${e.message}`);
  }
}
console.log("Done.");
