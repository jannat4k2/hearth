import fs from "node:fs";
import path from "node:path";
import { SITE_URL, recipes, collections, escHtml } from "./site-data.mjs";

const dist = path.resolve("dist");
const rootIndex = path.join(dist, "index.html");
if (!fs.existsSync(rootIndex)) throw new Error("dist/index.html not found. Run Vite build first.");

const template = fs.readFileSync(rootIndex, "utf8");
const start = "<!-- STATIC_SEO_START -->";
const end = "<!-- STATIC_SEO_END -->";
if (!template.includes(start) || !template.includes(end)) {
  throw new Error("Static SEO markers were not preserved in dist/index.html");
}

function imageUrl(image) {
  if (!image) return `${SITE_URL}/og.jpg`;
  if (/^https?:\/\//i.test(image)) return image;
  return `${SITE_URL}/${image.replace(/^\/+/, "")}`;
}

function seoBlock({ title, description, route, image, type = "website", noindex = false, published }) {
  const url = `${SITE_URL}${route === "/" ? "/" : route}`;
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const img = imageUrl(image);
  return `${start}\n    <title data-static-seo>${escHtml(title)}</title>\n    <meta data-static-seo name="description" content="${escHtml(description)}" />\n    <meta data-static-seo name="robots" content="${robots}" />\n    <link data-static-seo rel="canonical" href="${escHtml(url)}" />\n    <meta data-static-seo property="og:site_name" content="Hearth" />\n    <meta data-static-seo property="og:type" content="${type}" />\n    <meta data-static-seo property="og:title" content="${escHtml(title)}" />\n    <meta data-static-seo property="og:description" content="${escHtml(description)}" />\n    <meta data-static-seo property="og:url" content="${escHtml(url)}" />\n    <meta data-static-seo property="og:image" content="${escHtml(img)}" />${published ? `\n    <meta data-static-seo property="article:published_time" content="${published}" />` : ""}\n    <meta data-static-seo name="twitter:card" content="summary_large_image" />\n    <meta data-static-seo name="twitter:title" content="${escHtml(title)}" />\n    <meta data-static-seo name="twitter:description" content="${escHtml(description)}" />\n    <meta data-static-seo name="twitter:image" content="${escHtml(img)}" />\n    ${end}`;
}

function renderPage(meta) {
  return template.replace(new RegExp(`${start}[\\s\\S]*?${end}`), seoBlock(meta));
}

function targetFor(route) {
  if (route === "/") return rootIndex;
  return path.join(dist, route.replace(/^\//, "").replace(/\/$/, ""), "index.html");
}

const pages = [
  {
    route: "/",
    title: "Hearth — Recipes worth the pan",
    description: "Tested weeknight recipes, air fryer favorites, one-pan dinners, soups, salads, breakfast, and baking from the Hearth Test Kitchen.",
  },
  {
    route: "/recipes/",
    title: "Easy Recipes for Weeknights, Baking & More — Hearth",
    description: "Browse tested Hearth recipes for weeknight dinners, air fryer cooking, baking, soups, salads, breakfast, seafood, vegetarian meals, and more.",
  },
  {
    route: "/collections/",
    title: "Recipe Collections — Weeknight, Air Fryer, Baking & More | Hearth",
    description: "Browse Hearth recipe collections for weeknight dinners, air fryer cooking, vegetarian meals, baking, low-carb recipes, and one-pan favorites.",
  },
  {
    route: "/about/",
    title: "About the Hearth Test Kitchen",
    description: "Hearth is an independent test kitchen publishing practical, tested recipes with honest yields, clear timing, and straightforward cooking instructions.",
  },
  {
    route: "/saved/",
    title: "Saved Recipes — Hearth",
    description: "Recipes saved in your browser on this device.",
    noindex: true,
  },
  ...recipes.map((r) => ({
    route: `/recipes/${r.slug}/`,
    title: `${r.title} Recipe — Hearth`,
    description: r.dek,
    image: r.image,
    type: "article",
    published: r.published,
  })),
  ...collections.map((c) => ({
    route: `/collections/${c.slug}/`,
    title: `${c.title} Recipes — Hearth`,
    description: c.dek,
    image: c.image,
  })),
];

for (const page of pages) {
  const file = targetFor(page.route);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, renderPage(page));
}

const notFound = renderPage({
  route: "/404.html",
  title: "Page not found — Hearth",
  description: "The requested Hearth page could not be found.",
  noindex: true,
});
fs.writeFileSync(path.join(dist, "404.html"), notFound);

console.log(`Generated ${pages.length} clean GitHub Pages route mirrors plus 404.html.`);
