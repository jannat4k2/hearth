import fs from "node:fs";
import path from "node:path";

export const SITE_URL = "https://jannat4k2.github.io";

const source = fs.readFileSync(path.resolve("src/lib/recipes.ts"), "utf8");

function capture(section, regex) {
  return [...section.matchAll(regex)].map((m) => m.groups ?? {});
}

const recipesSection = source.slice(
  source.indexOf("export const recipes"),
  source.indexOf("export const collections"),
);
const collectionsSection = source.slice(
  source.indexOf("export const collections"),
  source.indexOf("export function getRecipe"),
);

export const recipes = capture(
  recipesSection,
  /slug:\s*"(?<slug>[^"]+)"[\s\S]*?title:\s*"(?<title>[^"]+)"[\s\S]*?dek:\s*"(?<dek>[^"]+)"[\s\S]*?image:\s*assetUrl\("(?<image>[^"]+)"\)[\s\S]*?published:\s*"(?<published>[^"]+)"/g,
);

export const collections = capture(
  collectionsSection,
  /slug:\s*"(?<slug>[^"]+)"[\s\S]*?title:\s*"(?<title>[^"]+)"[\s\S]*?dek:\s*"(?<dek>[^"]+)"[\s\S]*?image:\s*assetUrl\("(?<image>[^"]+)"\)/g,
);

if (recipes.length === 0 || collections.length === 0) {
  throw new Error("Could not extract recipe/collection SEO data from src/lib/recipes.ts");
}

export function escXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function escHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
