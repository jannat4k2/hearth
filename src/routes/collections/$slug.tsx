import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/layout";
import { RecipeGrid } from "@/components/site/recipe-card";
import { getCollection, recipesInCollection } from "@/lib/recipes";
import { NativeBanner } from "@/components/ads/adsterra";
import { seoHead } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd } from "@/components/site/json-ld";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const col = getCollection(params.slug);
    if (!col) throw notFound();
    return { col, recipes: recipesInCollection(col) };
  },
  head: ({ loaderData }) =>
    seoHead({
      title: `${loaderData?.col.title ?? "Recipe Collection"} Recipes — Hearth`,
      description: loaderData?.col.dek ?? "A curated Hearth recipe collection.",
      path: `/collections/${loaderData?.col.slug ?? ""}/`,
      image: loaderData?.col.image,
    }),
  component: CollectionPage,
  notFoundComponent: () => (
    <SiteLayout>
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Collection not found</h1>
        <Link to="/collections/" className="mt-6 inline-block text-sm font-medium text-clay">
          All collections
        </Link>
      </main>
    </SiteLayout>
  ),
});

function CollectionPage() {
  const { col, recipes } = Route.useLoaderData();
  return (
    <SiteLayout>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections/" },
          { name: col.title, path: `/collections/${col.slug}/` },
        ])}
      />
      <main>
        <div className="relative h-56 overflow-hidden bg-ink sm:h-72">
          <img src={col.image} alt="" fetchPriority="high" decoding="async" className="size-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-ink/10" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <nav className="text-sm text-paper/70">
              <Link to="/collections/" className="hover:text-paper">
                Collections
              </Link>
            </nav>
            <h1 className="mt-2 font-display text-4xl font-semibold text-paper">{col.title}</h1>
            <p className="mt-2 max-w-xl text-paper/85">{col.dek}</p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-10">
            <NativeBanner />
          </div>
          <RecipeGrid recipes={recipes} />
        </div>
      </main>
    </SiteLayout>
  );
}
