import fs from "node:fs";
import path from "node:path";
import { SITE_URL, recipes, collections, escXml } from "./site-data.mjs";

const publicDir = path.resolve("public");
fs.mkdirSync(publicDir, { recursive: true });

const latestRecipeDate = recipes.map((r) => r.published).sort().at(-1);
const today = new Date().toISOString().slice(0, 10);

const entries = [
  { loc: `${SITE_URL}/`, lastmod: latestRecipeDate ?? today, changefreq: "weekly", priority: "1.0" },
  { loc: `${SITE_URL}/recipes/`, lastmod: latestRecipeDate ?? today, changefreq: "weekly", priority: "0.9" },
  { loc: `${SITE_URL}/collections/`, lastmod: latestRecipeDate ?? today, changefreq: "weekly", priority: "0.8" },
  ...recipes.map((r) => ({
    loc: `${SITE_URL}/recipes/${r.slug}/`,
    lastmod: r.published,
    changefreq: "monthly",
    priority: "0.8",
  })),
  ...collections.map((c) => ({
    loc: `${SITE_URL}/collections/${c.slug}/`,
    lastmod: latestRecipeDate ?? today,
    changefreq: "monthly",
    priority: "0.7",
  })),
  { loc: `${SITE_URL}/about/`, lastmod: today, changefreq: "yearly", priority: "0.4" },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
  .map(
    (e) => `  <url>\n    <loc>${escXml(e.loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
  )
  .join("\n")}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(publicDir, "robots.txt"), robots);
console.log(`Generated sitemap.xml with ${entries.length} indexable URLs and robots.txt.`);
