import type { Recipe } from "@/lib/recipes";
import { formatIngredientLine, isoDuration } from "@/lib/format";
import { absoluteAssetUrl, absoluteSiteUrl } from "@/lib/seo";

export function recipeJsonLd(recipe: Recipe) {
  const url = absoluteSiteUrl(`/recipes/${recipe.slug}/`);
  return {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "@id": `${url}#recipe`,
    mainEntityOfPage: url,
    url,
    name: recipe.title,
    image: [absoluteAssetUrl(recipe.image)],
    author: { "@type": "Organization", name: recipe.author },
    datePublished: recipe.published,
    description: recipe.dek,
    prepTime: isoDuration(recipe.prepMinutes),
    cookTime: isoDuration(recipe.cookMinutes),
    totalTime: isoDuration(recipe.prepMinutes + recipe.cookMinutes),
    recipeYield: recipe.yieldLabel,
    recipeCategory: recipe.categories.join(", "),
    recipeCuisine: recipe.cuisine,
    keywords: [...recipe.categories, ...recipe.diets].join(", "),
    nutrition: {
      "@type": "NutritionInformation",
      calories: `${recipe.nutrition.calories} calories`,
      proteinContent: `${recipe.nutrition.protein} g`,
      carbohydrateContent: `${recipe.nutrition.carbs} g`,
      fatContent: `${recipe.nutrition.fat} g`,
      fiberContent: `${recipe.nutrition.fiber} g`,
      sugarContent: `${recipe.nutrition.sugar} g`,
      sodiumContent: `${recipe.nutrition.sodium} mg`,
    },
    recipeIngredient: recipe.ingredients.map((i) =>
      formatIngredientLine(i.quantity, i.unit, i.label, 1),
    ),
    recipeInstructions: recipe.steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      text: s.text,
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteSiteUrl(item.path),
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
