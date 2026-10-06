#!/usr/bin/env node
// IndexNow ping (Bing, Yandex, Seznam, Naver; also feeds Bing-powered AI search).
//
// Reads the live sitemap, picks URLs whose <lastmod> is within the last
// LOOKBACK_DAYS (default 2), and submits them in one request. Run after a
// production deploy is live; .github/workflows/indexnow.yml does that
// automatically when Vercel reports a successful Production deployment.
//
//   node scripts/indexnow.mjs            # changed URLs only
//   node scripts/indexnow.mjs --all      # every URL in the sitemap
//
// Google does not use IndexNow; it reads sitemap.xml and news-sitemap.xml.

const HOST = "www.thenashikkumbh.com";
const KEY = "c1294702051c2622d8e4bad4f685ae05"; // also served at https://www.thenashikkumbh.com/c1294702051c2622d8e4bad4f685ae05.txt
const LOOKBACK_DAYS = Number(process.env.LOOKBACK_DAYS ?? 2);

const all = process.argv.includes("--all");
const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
  loc: block.match(/<loc>(.*?)<\/loc>/)?.[1],
  lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
}));

const cutoff = Date.now() - LOOKBACK_DAYS * 864e5;
const urls = entries
  .filter((e) => e.loc && (all || (e.lastmod && Date.parse(e.lastmod) >= cutoff)))
  .map((e) => e.loc);

if (urls.length === 0) {
  console.log("IndexNow: nothing changed in the last", LOOKBACK_DAYS, "days.");
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls.slice(0, 10000),
  }),
});
console.log(`IndexNow: submitted ${urls.length} URLs, HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exit(1);
