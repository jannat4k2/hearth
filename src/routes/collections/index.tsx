import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { collections } from "@/lib/recipes";

export const Route = createFileRoute("/collections/")({
  component: CollectionsIndex,
  head: () => ({
    meta: [
      { title: "Collections — Hearth" },
      { name: "description", content: "Keto, weeknight, air fryer, baking, and one-pan collections from the Hearth kitchen." },
    ],
  }),
});

function CollectionsIndex() {
  return (
    <SiteLayout>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Browse by mood</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Collections</h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Shorthand for how we actually cook: Tuesday night, low carb, one pan, something sweet.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="group overflow-hidden rounded-xl bg-elevated shadow-[0_0_0_1px_var(--color-line)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={c.image}
                  alt=""
                  className="recipe-img size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl font-semibold text-ink group-hover:text-clay">{c.title}</h2>
                <p className="mt-2 text-sm text-ink-soft">{c.dek}</p>
                <p className="mt-3 text-xs text-ink-faint">{c.recipeSlugs.length} recipes</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </SiteLayout>
  );
}
