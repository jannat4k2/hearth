import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/layout";
import { RecipeGrid } from "@/components/site/recipe-card";
import { useFavorites } from "@/lib/favorites";
import { getRecipe, type Recipe } from "@/lib/recipes";
import { NativeBanner } from "@/components/ads/adsterra";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/saved")({
  component: SavedPage,
  head: () =>
    seoHead({
      title: "Saved Recipes — Hearth",
      description: "Recipes saved in your browser on this device.",
      path: "/saved/",
      noindex: true,
    }),
});

function SavedPage() {
  const slugs = useFavorites((s) => s.slugs);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const list = slugs.map(getRecipe).filter((r): r is Recipe => Boolean(r));

  return (
    <SiteLayout>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">On this device</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Saved</h1>
        <div className="mt-8">
          <NativeBanner />
        </div>
        {!ready ? (
          <p className="mt-10 text-sm text-ink-faint">Loading saved recipes…</p>
        ) : list.length === 0 ? (
          <div className="mt-10 rounded-xl bg-elevated px-6 py-16 text-center shadow-[0_0_0_1px_var(--color-line)]">
            <p className="font-display text-2xl font-semibold text-ink">Nothing saved yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
              Heart a recipe and it will live here. Saves stay in this browser — no account required.
            </p>
            <Link to="/recipes/" className="mt-6 inline-block text-sm font-medium text-clay">
              Browse recipes
            </Link>
          </div>
        ) : (
          <div className="mt-8">
            <RecipeGrid recipes={list} />
          </div>
        )}
      </main>
    </SiteLayout>
  );
}
