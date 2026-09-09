import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import type { Recipe } from "@/lib/recipes";
import { formatMinutes } from "@/lib/format";
import { cn } from "@/lib/utils";

export function RecipeCard({
  recipe,
  featured = false,
}: {
  recipe: Recipe;
  featured?: boolean;
}) {
  const total = recipe.prepMinutes + recipe.cookMinutes;
  return (
    <Link
      to="/recipes/$slug/"
      params={{ slug: recipe.slug }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-elevated shadow-[0_0_0_1px_var(--color-line),0_1px_2px_rgba(31,26,22,0.04)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[0_0_0_1px_var(--color-line-strong),0_8px_24px_rgba(31,26,22,0.06)]",
        featured && "md:flex-row",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-paper-2",
          featured ? "aspect-[4/3] md:aspect-auto md:w-[54%] md:min-h-[280px]" : "aspect-[4/3]",
        )}
      >
        <img
          src={recipe.image}
          alt={recipe.imageAlt}
          loading={featured ? "eager" : "lazy"}
          fetchPriority={featured ? "high" : "auto"}
          decoding="async"
          className="recipe-img size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col p-5", featured && "md:p-8 md:justify-center")}>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-clay">
          {recipe.categories[0]?.replace("-", " ")}
          <span className="text-ink-faint"> · {formatMinutes(total)}</span>
        </p>
        <h3
          className={cn(
            "mt-2 font-display font-semibold tracking-tight text-ink group-hover:text-clay",
            featured ? "text-2xl md:text-3xl" : "text-xl",
          )}
        >
          {recipe.title}
        </h3>
        <p className={cn("mt-2 text-sm leading-relaxed text-ink-soft", featured && "md:text-base")}>
          {recipe.dek}
        </p>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-faint">
          <Clock className="size-3.5" aria-hidden />
          {recipe.yieldLabel} · {recipe.calories} kcal
        </p>
      </div>
    </Link>
  );
}

export function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  if (recipes.length === 0) {
    return (
      <p className="rounded-xl bg-elevated px-5 py-12 text-center text-sm text-ink-soft shadow-[0_0_0_1px_var(--color-line)]">
        No recipes match those filters. Try a different search or clear the chips.
      </p>
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((r) => (
        <RecipeCard key={r.slug} recipe={r} />
      ))}
    </div>
  );
}
