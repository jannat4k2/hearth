import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { RecipeGrid } from "@/components/site/recipe-card";
import { CATEGORIES, DIETS, filterRecipes } from "@/lib/recipes";
import { cn } from "@/lib/utils";
import { NativeBanner } from "@/components/ads/adsterra";
import { seoHead } from "@/lib/seo";

type RecipesSearch = {
  q?: string;
  cat?: string;
  diet?: string;
};

export const Route = createFileRoute("/recipes/")({
  validateSearch: (search: Record<string, unknown>): RecipesSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    cat: typeof search.cat === "string" ? search.cat : undefined,
    diet: typeof search.diet === "string" ? search.diet : undefined,
  }),
  component: RecipesIndex,
  head: () =>
    seoHead({
      title: "Easy Recipes for Weeknights, Baking & More — Hearth",
      description: "Browse tested Hearth recipes for weeknight dinners, air fryer cooking, baking, soups, salads, breakfast, seafood, vegetarian meals, and more.",
      path: "/recipes/",
    }),
});

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 shrink-0 rounded-full px-4 text-sm font-medium transition-colors duration-150",
        active ? "bg-ink text-paper" : "bg-elevated text-ink-soft shadow-[0_0_0_1px_var(--color-line)] hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function RecipesIndex() {
  const { q, cat, diet } = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = filterRecipes({ q, cat, diet });

  function setSearch(next: RecipesSearch) {
    void navigate({
      to: "/recipes/",
      search: {
        q: next.q || undefined,
        cat: next.cat || undefined,
        diet: next.diet || undefined,
      },
    });
  }

  return (
    <SiteLayout>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">The archive</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Recipes</h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Twelve tested dishes. Filter by diet or collection, or search an ingredient.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <Chip active={!cat} onClick={() => setSearch({ q, cat: undefined, diet })}>
              All
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.slug}
                active={cat === c.slug}
                onClick={() => setSearch({ q, cat: cat === c.slug ? undefined : c.slug, diet })}
              >
                {c.label}
              </Chip>
            ))}
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {DIETS.map((d) => (
              <Chip
                key={d.slug}
                active={diet === d.slug}
                onClick={() => setSearch({ q, cat, diet: diet === d.slug ? undefined : d.slug })}
              >
                {d.label}
              </Chip>
            ))}
          </div>
        </div>

        <p className="mt-6 mb-5 text-sm text-ink-faint">
          {list.length} {list.length === 1 ? "recipe" : "recipes"}
          {q ? ` for “${q}”` : ""}
        </p>
        <div className="mb-10">
          <NativeBanner />
        </div>
        <RecipeGrid recipes={list} />
      </main>
    </SiteLayout>
  );
}
