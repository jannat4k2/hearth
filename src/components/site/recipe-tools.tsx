import { Check, Heart, Minus, Plus, Printer, Utensils } from "lucide-react";
import { useMemo, useState } from "react";
import type { Ingredient, Recipe } from "@/lib/recipes";
import { formatIngredientLine, formatQty } from "@/lib/format";
import { useFavorites } from "@/lib/favorites";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SaveButton({ slug }: { slug: string }) {
  const saved = useFavorites((s) => s.has(slug));
  const toggle = useFavorites((s) => s.toggle);
  return (
    <Button variant={saved ? "primary" : "outline"} onClick={() => toggle(slug)} className="no-print">
      <Heart className={cn("size-4", saved && "fill-current")} />
      {saved ? "Saved" : "Save"}
    </Button>
  );
}

export function ServingScaler({
  base,
  scale,
  onChange,
}: {
  base: number;
  scale: number;
  onChange: (n: number) => void;
}) {
  const servings = Math.max(1, Math.round(base * scale));
  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-md text-ink shadow-[0_0_0_1px_var(--color-line)] hover:bg-paper-2"
        onClick={() => onChange(Math.max(0.5, scale - 0.5))}
        aria-label="Fewer servings"
      >
        <Minus className="size-4" />
      </button>
      <p className="min-w-16 text-center text-sm text-ink">
        <span className="font-medium tabular-nums">{servings}</span>
        <span className="block text-xs text-ink-faint">servings</span>
      </p>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-md text-ink shadow-[0_0_0_1px_var(--color-line)] hover:bg-paper-2"
        onClick={() => onChange(scale + 0.5)}
        aria-label="More servings"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function IngredientList({
  ingredients,
  scale,
}: {
  ingredients: Ingredient[];
  scale: number;
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const groups = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, Array<{ ing: Ingredient; i: number }>>();
    ingredients.forEach((ing, i) => {
      const g = ing.group ?? "Ingredients";
      if (!map.has(g)) {
        map.set(g, []);
        order.push(g);
      }
      map.get(g)!.push({ ing, i });
    });
    return order.map((name) => ({ name, items: map.get(name)! }));
  }, [ingredients]);

  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g.name}>
          {groups.length > 1 ? (
            <h3 className="mb-2 font-display text-base font-semibold text-ink">{g.name}</h3>
          ) : null}
          <ul className="divide-y divide-line">
            {g.items.map(({ ing, i }) => {
              const on = Boolean(checked[i]);
              return (
                <li key={i}>
                  <label className="flex min-h-11 cursor-pointer items-start gap-3 py-2.5">
                    <span
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm shadow-[0_0_0_1px_var(--color-line-strong)]",
                        on && "bg-clay text-elevated shadow-none",
                      )}
                    >
                      {on ? <Check className="size-3.5" strokeWidth={3} /> : null}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
                    />
                    <span className={cn("text-sm leading-snug text-ink", on && "text-ink-faint line-through")}>
                      {formatIngredientLine(ing.quantity, ing.unit, ing.label, scale)}
                      {ing.optional ? <span className="text-ink-faint"> (optional)</span> : null}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function NutritionPanel({ recipe, scale }: { recipe: Recipe; scale: number }) {
  const n = recipe.nutrition;
  const factor = scale;
  const rows: Array<[string, string]> = [
    ["Calories", String(Math.round(n.calories * factor))],
    ["Protein", `${formatQty(n.protein * factor)} g`],
    ["Carbs", `${formatQty(n.carbs * factor)} g`],
    ["Fat", `${formatQty(n.fat * factor)} g`],
    ["Fiber", `${formatQty(n.fiber * factor)} g`],
    ["Sugar", `${formatQty(n.sugar * factor)} g`],
    ["Sodium", `${Math.round(n.sodium * factor)} mg`],
  ];
  return (
    <div className="rounded-xl bg-elevated p-5 shadow-[0_0_0_1px_var(--color-line)]">
      <h2 className="font-display text-lg font-semibold text-ink">Nutrition</h2>
      <p className="mt-1 text-xs text-ink-faint">Per scaled batch, estimated.</p>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs text-ink-faint">{k}</dt>
            <dd className="font-medium tabular-nums text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function RecipeActions({
  recipe,
  onCook,
}: {
  recipe: Recipe;
  onCook: () => void;
}) {
  return (
    <div className="no-print flex flex-wrap gap-2">
      <SaveButton slug={recipe.slug} />
      <Button variant="outline" onClick={onCook}>
        <Utensils className="size-4" />
        Cook mode
      </Button>
      <Button variant="outline" onClick={() => window.print()}>
        <Printer className="size-4" />
        Print
      </Button>
    </div>
  );
}
