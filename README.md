# Hearth — GitHub Pages + SEO + Adsterra

Production-ready static Vite/React recipe site for the GitHub Pages user-site repository `jannat4k2.github.io`.

## Deploy

1. Upload this project to the repository named exactly `jannat4k2.github.io`.
2. In GitHub: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main`.
4. The included workflow runs `npm ci`, `npm run build`, uploads `dist`, and deploys Pages.

Live URL: `https://jannat4k2.github.io/`

## Clean GitHub Pages routes

The app now uses browser-history URLs (not hash URLs). During every production build, `scripts/generate-static-pages.mjs` creates real static route mirrors such as:

- `/recipes/`
- `/recipes/air-fryer-garlic-knots/`
- `/collections/`
- `/collections/keto/`
- `/about/`

This lets GitHub Pages return a real `200` document for known clean routes instead of relying on a 404 SPA fallback.

## SEO included

- Clean indexable URLs with trailing slashes
- Canonical URLs
- Route-specific titles and meta descriptions
- Open Graph and Twitter metadata
- `robots` directives
- Recipe Schema.org JSON-LD
- Breadcrumb Schema.org JSON-LD
- WebSite/SearchAction JSON-LD
- `public/robots.txt`
- automatically generated `public/sitemap.xml`
- `site.webmanifest`
- route-specific static SEO metadata injected into every built route mirror
- `/saved/` is `noindex` because it contains browser-local user state

The sitemap is regenerated automatically before each build from `src/lib/recipes.ts`.

Sitemap URL: `https://jannat4k2.github.io/sitemap.xml`

Robots URL: `https://jannat4k2.github.io/robots.txt`

After deployment, submit the sitemap URL in Google Search Console and Bing Webmaster Tools.

## Adsterra integration

Ad code lives in:

`src/components/ads/adsterra.tsx`

Integrated units:

- Smartlink — clearly marked sponsored link
- Social Bar — loaded once globally in the page body
- Popunder — script injected into `<head>` only once per browser session by Hearth
- Native Banner 4:1 — one high-viewability placement on every route
- 728×90 — desktop top leaderboard
- 320×50 — mobile top leaderboard
- 468×60 — mid/wide footer monetization area where it fits
- 300×250 — universal rectangle near the end of content
- 160×600 — desktop rail on very wide screens; lower placement on medium desktop/tablet
- 160×300 — desktop rail on very wide screens; lower placement on smaller screens

All inline display placements are visually labeled `Advertisement` or `Sponsored link` and are kept outside navigation and recipe instruction controls.

### Important Native Banner note

Only one Native Banner code was supplied. Do not duplicate that exact code several times on one page. If you want additional Native placements, request additional unique Native Banner zone codes from Adsterra and add each code as its own placement.

## Build commands

```bash
npm ci
npm run build
```

The build lifecycle automatically runs:

1. `prebuild` → generate sitemap/robots
2. TypeScript check
3. Vite production build
4. `postbuild` → generate clean static route mirrors and static route SEO
