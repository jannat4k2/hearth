import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/layout";
import { RecipeCard } from "@/components/site/recipe-card";
import { collections, featuredRecipe, recipes } from "@/lib/recipes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { assetUrl } from "@/lib/assets";
import { NativeBanner } from "@/components/ads/adsterra";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    seoHead({
      title: "Hearth — Recipes worth the pan",
      description:
        "Tested weeknight recipes, air fryer favorites, one-pan dinners, soups, salads, breakfast, and baking from the Hearth Test Kitchen.",
      path: "/",
    }),
});

function Home() {
  const rest = recipes.filter((r) => r.slug !== featuredRecipe.slug).slice(0, 6);
  const tiles = collections.slice(0, 4);

  return (
    <SiteLayout>
      <section className="relative min-h-[72vh] overflow-hidden bg-ink">
        <img
          src={assetUrl("recipes/hero.jpg")}
          alt="A table set with roasted vegetables, bread, and a glass of wine"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/20" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/80">The weeknight table</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-tight text-paper sm:text-6xl">
            Recipes worth the pan.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-paper/85">
            Tested twice. Written in minutes and grams. Built for Tuesday night, not a photoshoot.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/recipes/" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
              Browse recipes
            </Link>
            <Link
              to="/recipes/$slug/"
              params={{ slug: featuredRecipe.slug }}
              className={cn(buttonVariants({ variant: "inverse", size: "lg" }))}
            >
              The garlic knots
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Cover story</p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-ink">This week in the kitchen</h2>
          </div>
        </div>
        <RecipeCard recipe={featuredRecipe} featured />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <NativeBanner />
      </section>

      <section className="bg-paper-2 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl font-semibold text-ink">Collections</h2>
            <Link to="/collections/" className="hidden items-center gap-1 text-sm font-medium text-clay sm:inline-flex">
              All collections
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map((c) => (
              <Link
                key={c.slug}
                to="/collections/$slug/"
                params={{ slug: c.slug }}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl"
              >
                <img
                  src={c.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="recipe-img absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-xl font-semibold text-paper">{c.title}</h3>
                  <p className="mt-1 text-sm text-paper/80">{c.dek}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold text-ink">From the archive</h2>
          <Link to="/recipes/" className="hidden items-center gap-1 text-sm font-medium text-clay sm:inline-flex">
            All recipes
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
