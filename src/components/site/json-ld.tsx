import type { Recipe } from "@/lib/recipes";
import { formatIngredientLine, isoDuration } from "@/lib/format";

export function recipeJsonLd(recipe: Recipe) {
  return {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: recipe.title,
    image: [recipe.image],
    author: { "@type": "Organization", name: recipe.author },
    datePublished: recipe.published,
    description: recipe.dek,
    prepTime: isoDuration(recipe.prepMinutes),
    cookTime: isoDuration(recipe.cookMinutes),
    totalTime: isoDuration(recipe.prepMinutes + recipe.cookMinutes),
    recipeYield: recipe.yieldLabel,
    recipeCategory: recipe.categories[0],
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

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
