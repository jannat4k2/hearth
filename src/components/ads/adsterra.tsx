import { useEffect, useMemo, useState, type ReactNode } from "react";

const SMARTLINK = "https://www.profitableratecpmnetwork.com/z131r6vvgt?key=f058995b1a07f9b3890b3e3b077f3de2";
const SOCIAL_BAR_SRC = "https://pl31265994.profitableratecpmnetwork.com/f2/7f/8c/f27f8c4e7ac5ca05244122659bddba7d.js";
const POPUNDER_SRC = "https://pl31265996.profitableratecpmnetwork.com/1d/bd/5e/1dbd5ebe1a368411ad2e5516ef8e28b2.js";
const NATIVE_SRC = "https://pl31265995.profitableratecpmnetwork.com/0b47e264c54dcdd189ae8ade9488c831/invoke.js";
const NATIVE_CONTAINER = "container-0b47e264c54dcdd189ae8ade9488c831";

const BANNERS = {
  "728x90": { key: "82c5cd0a5e66ed8a4506322eb5dcabe6", width: 728, height: 90 },
  "468x60": { key: "597c996938b1af9b840441b2d250c5a0", width: 468, height: 60 },
  "320x50": { key: "e4cc9221b1fdf9169e495dd070072d5d", width: 320, height: 50 },
  "300x250": { key: "a16e0a50d324a0f76a48b9c0ac14ab53", width: 300, height: 250 },
  "160x600": { key: "2ebce4a9fbeafaed1103a8bd3c6d65d2", width: 160, height: 600 },
  "160x300": { key: "10a228dfe945b5abdb7645197c29c7eb", width: 160, height: 300 },
} as const;

type BannerSize = keyof typeof BANNERS;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function htmlDocument(body: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="referrer" content="strict-origin-when-cross-origin"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{display:flex;align-items:flex-start;justify-content:center}</style></head><body>${body}</body></html>`;
}

function bannerDocument(size: BannerSize) {
  const unit = BANNERS[size];
  return htmlDocument(`<script>var atOptions={'key':'${unit.key}','format':'iframe','height':${unit.height},'width':${unit.width},'params':{}};<\/script><script src="https://www.highrevenueformat.com/${unit.key}/invoke.js"><\/script>`);
}

export function AdLabel({ children }: { children: ReactNode }) {
  return (
    <div className="no-print" aria-label="Advertisement">
      <div className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">Advertisement</div>
      {children}
    </div>
  );
}

export function BannerAd({ size, className = "" }: { size: BannerSize; className?: string }) {
  const unit = BANNERS[size];
  const srcDoc = useMemo(() => bannerDocument(size), [size]);

  return (
    <AdLabel>
      <div className={`mx-auto overflow-hidden ${className}`} style={{ width: unit.width, maxWidth: "100%", minHeight: unit.height }}>
        <iframe
          title={`Sponsored ${size} banner`}
          srcDoc={srcDoc}
          width={unit.width}
          height={unit.height}
          loading="lazy"
          scrolling="no"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block border-0"
          style={{ width: unit.width, height: unit.height, maxWidth: "100%" }}
        />
      </div>
    </AdLabel>
  );
}

export function ResponsiveLeaderboard() {
  const desktop = useMediaQuery("(min-width: 800px)");
  return desktop ? <BannerAd size="728x90" /> : <BannerAd size="320x50" />;
}

export function MidBanner() {
  const wideEnough = useMediaQuery("(min-width: 520px)");
  if (!wideEnough) return null;
  return <BannerAd size="468x60" />;
}

export function RectangleAd() {
  return <BannerAd size="300x250" />;
}

export function DesktopAdRails() {
  const show = useMediaQuery("(min-width: 1540px)");
  if (!show) return null;
  return (
    <>
      <div className="no-print fixed left-4 top-24 z-20 hidden 2xl:block">
        <BannerAd size="160x600" />
      </div>
      <div className="no-print fixed right-4 top-24 z-20 hidden 2xl:block">
        <BannerAd size="160x300" />
      </div>
    </>
  );
}

export function LowerSkyscraperAds() {
  const wideRail = useMediaQuery("(min-width: 1540px)");
  const tablet = useMediaQuery("(min-width: 768px)");
  if (wideRail) return null;
  return (
    <div className="flex flex-wrap items-start justify-center gap-10">
      {tablet ? <BannerAd size="160x600" /> : null}
      <BannerAd size="160x300" />
    </div>
  );
}

export function NativeBanner() {
  const compact = useMediaQuery("(max-width: 639px)");
  const srcDoc = useMemo(
    () =>
      htmlDocument(`<div id="${NATIVE_CONTAINER}" style="width:100%"></div><script async="async" data-cfasync="false" src="${NATIVE_SRC}"><\/script>`),
    [],
  );

  return (
    <AdLabel>
      <iframe
        title="Sponsored recommendations"
        srcDoc={srcDoc}
        width="100%"
        height={compact ? 520 : 300}
        loading="lazy"
        scrolling="no"
        referrerPolicy="strict-origin-when-cross-origin"
        className="block w-full border-0"
        style={{ minHeight: compact ? 520 : 300 }}
      />
    </AdLabel>
  );
}

export function SponsoredDiscoveryLink({ compact = false }: { compact?: boolean }) {
  return (
    <div className="no-print mx-auto max-w-3xl rounded-xl border border-line bg-elevated p-4 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">Sponsored link</p>
      <a
        href={SMARTLINK}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="mt-1 inline-flex min-h-10 items-center justify-center text-sm font-semibold text-clay underline decoration-clay/35 underline-offset-4 hover:text-clay-dark"
      >
        {compact ? "Explore a sponsored offer" : "Discover today’s sponsored offer"}
      </a>
    </div>
  );
}

export function GlobalAdScripts() {
  useEffect(() => {
    if (!document.querySelector(`script[src="${SOCIAL_BAR_SRC}"]`)) {
      const social = document.createElement("script");
      social.src = SOCIAL_BAR_SRC;
      social.async = true;
      social.dataset.hearthAd = "social-bar";
      document.body.appendChild(social);
    }

    const popKey = "hearth-adsterra-popunder-loaded";
    let popSeen = false;
    try {
      popSeen = sessionStorage.getItem(popKey) === "1";
    } catch {
      // Storage can be unavailable in hardened/privacy browser modes.
    }

    if (!popSeen && !document.querySelector(`script[src="${POPUNDER_SRC}"]`)) {
      try {
        sessionStorage.setItem(popKey, "1");
      } catch {
        // The DOM-level duplicate check still prevents a second load in this page view.
      }
      const pop = document.createElement("script");
      pop.src = POPUNDER_SRC;
      pop.async = true;
      pop.dataset.hearthAd = "popunder";
      document.head.appendChild(pop);
    }
  }, []);

  return null;
}

export function GlobalBottomAds() {
  return (
    <section className="no-print border-t border-line bg-paper py-10" aria-label="Sponsored content">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <MidBanner />
        <div className="flex justify-center">
          <RectangleAd />
        </div>
        <LowerSkyscraperAds />
        <SponsoredDiscoveryLink />
      </div>
    </section>
  );
}
