import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Flame, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/layout";
import { RecipeCard } from "@/components/site/recipe-card";
import { CookMode } from "@/components/site/cook-mode";
import { IngredientList, NutritionPanel, RecipeActions, ServingScaler } from "@/components/site/recipe-tools";
import { JsonLd, recipeJsonLd } from "@/components/site/json-ld";
import { getRecipe, relatedRecipes } from "@/lib/recipes";
import { formatMinutes } from "@/lib/format";

export const Route = createFileRoute("/recipes/$slug")({
  loader: ({ params }) => {
    const recipe = getRecipe(params.slug);
    if (!recipe) throw notFound();
    return recipe;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Recipe"} — Hearth` },
      { name: "description", content: loaderData?.dek ?? "A Hearth recipe." },
    ],
  }),
  component: RecipePage,
  notFoundComponent: () => (
    <SiteLayout>
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Recipe not found</h1>
        <p className="mt-3 text-ink-soft">That dish is not in the archive.</p>
        <Link to="/recipes" className="mt-6 inline-block text-sm font-medium text-clay">
          Browse recipes
        </Link>
      </main>
    </SiteLayout>
  ),
});

function RecipePage() {
  const recipe = Route.useLoaderData();
  const [scale, setScale] = useState(1);
  const [cook, setCook] = useState(false);
  const related = useMemo(() => relatedRecipes(recipe), [recipe]);

  return (
    <SiteLayout>
      <JsonLd data={recipeJsonLd(recipe)} />
      <article className="recipe-print mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <nav className="no-print mb-5 text-sm text-ink-faint">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link to="/recipes" className="hover:text-ink">
            Recipes
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink-soft">{recipe.title}</span>
        </nav>

        <div className="overflow-hidden rounded-xl">
          <img src={recipe.image} alt={recipe.imageAlt} className="recipe-img aspect-[16/10] w-full object-cover sm:aspect-[2/1]" />
        </div>

        <header className="mx-auto mt-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
            {recipe.categories.map((c) => c.replace("-", " ")).join(" · ")}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {recipe.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{recipe.dek}</p>

          <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-5">
            <div>
              <dt className="flex items-center gap-1.5 text-xs text-ink-faint">
                <Clock className="size-3.5" /> Prep
              </dt>
              <dd className="mt-1 font-medium tabular-nums">{formatMinutes(recipe.prepMinutes)}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs text-ink-faint">
                <Flame className="size-3.5" /> Cook
              </dt>
              <dd className="mt-1 font-medium tabular-nums">{formatMinutes(recipe.cookMinutes)}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs text-ink-faint">
                <Users className="size-3.5" /> Yield
              </dt>
              <dd className="mt-1 font-medium">{recipe.yieldLabel}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <ServingScaler base={recipe.servings} scale={scale} onChange={setScale} />
            <RecipeActions recipe={recipe} onCook={() => setCook(true)} />
          </div>
        </header>

        <div className="mx-auto mt-10 max-w-3xl">
          <p className="text-base leading-relaxed text-ink">{recipe.story}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:items-start">
          <aside className="rounded-xl bg-elevated p-5 shadow-[0_0_0_1px_var(--color-line)] lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-semibold text-ink">Ingredients</h2>
            <p className="mt-1 text-xs text-ink-faint">Check them off as you go. Scaled to {Math.round(recipe.servings * scale)} servings.</p>
            <div className="mt-4">
              <IngredientList ingredients={recipe.ingredients} scale={scale} />
            </div>
          </aside>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Method</h2>
            <ol className="mt-5 space-y-6">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-paper-2 font-display text-sm font-semibold text-clay">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[15px] leading-relaxed text-ink">{step.text}</p>
                    {step.minutes ? (
                      <p className="mt-1 text-xs text-ink-faint">{step.minutes} min</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            {recipe.notes.length > 0 ? (
              <div className="mt-10 rounded-xl bg-paper-2 p-5">
                <h2 className="font-display text-lg font-semibold text-ink">Test kitchen notes</h2>
                <ul className="mt-3 space-y-2">
                  {recipe.notes.map((n) => (
                    <li key={n} className="text-sm leading-relaxed text-ink-soft">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10">
          <NutritionPanel recipe={recipe} scale={scale} />
        </div>

        {related.length > 0 ? (
          <section className="no-print mt-16">
            <h2 className="font-display text-2xl font-semibold text-ink">Make next</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
      {cook ? <CookMode recipe={recipe} onClose={() => setCook(false)} /> : null}
    </SiteLayout>
  );
}
