export const SITE_URL = "https://jannat4k2.github.io";
export const SITE_NAME = "Hearth";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.jpg`;

export function absoluteSiteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
}

export function absoluteAssetUrl(path?: string) {
  if (!path) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(path)) return path;
  return absoluteSiteUrl(path.replace(/^\.\//, "/"));
}

type MetaEntry = Record<string, string>;

type SeoHeadOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  extraMeta?: MetaEntry[];
};

export function seoHead({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noindex = false,
  extraMeta = [],
}: SeoHeadOptions) {
  const url = absoluteSiteUrl(path);
  const ogImage = absoluteAssetUrl(image);
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robots },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:type", content: type },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: `${title} — ${SITE_NAME}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      ...extraMeta,
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
