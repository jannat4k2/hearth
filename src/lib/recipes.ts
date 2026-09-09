import { assetUrl } from "@/lib/assets";

export type Difficulty = "easy" | "medium" | "weekend";

export type Ingredient = {
  quantity: number;
  unit: string;
  label: string;
  group?: string;
  optional?: boolean;
};

export type Step = {
  text: string;
  minutes?: number;
};

export type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
};

export type Recipe = {
  slug: string;
  title: string;
  dek: string;
  story: string;
  image: string;
  imageAlt: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  yieldLabel: string;
  calories: number;
  difficulty: Difficulty;
  categories: string[];
  diets: string[];
  cuisine: string;
  ingredients: Ingredient[];
  steps: Step[];
  notes: string[];
  nutrition: Nutrition;
  author: string;
  published: string;
  featured?: boolean;
};

export type Collection = {
  slug: string;
  title: string;
  dek: string;
  image: string;
  recipeSlugs: string[];
};

export const CATEGORIES = [
  { slug: "air-fryer", label: "Air fryer" },
  { slug: "weeknight", label: "Weeknight" },
  { slug: "baking", label: "Baking" },
  { slug: "soups", label: "Soups" },
  { slug: "salads", label: "Salads" },
  { slug: "seafood", label: "Seafood" },
  { slug: "meat", label: "Meat" },
  { slug: "breakfast", label: "Breakfast" },
  { slug: "sides", label: "Sides" },
  { slug: "vegetarian", label: "Vegetarian" },
] as const;

export const DIETS = [
  { slug: "keto", label: "Keto" },
  { slug: "low-carb", label: "Low carb" },
  { slug: "vegetarian", label: "Vegetarian" },
  { slug: "gluten-free", label: "Gluten-free" },
] as const;

export const recipes: Recipe[] = [
  {
    slug: "air-fryer-garlic-knots",
    title: "Air Fryer Garlic Knots",
    dek: "Keto fathead dough, twenty-five minutes, actually crispy.",
    story:
      "Most low-carb bread is a compromise you eat to be polite. These knots are not that. Melted mozzarella binds almond flour into a dough that puffs in the air fryer, then gets painted with garlic butter while it is still hot enough to hiss. They are the thing people hover over at the counter.",
    image: assetUrl("recipes/garlic-knots.jpg"),
    imageAlt: "Golden air-fryer garlic knots glazed with parsley butter on a ceramic plate",
    prepMinutes: 15,
    cookMinutes: 10,
    servings: 4,
    yieldLabel: "8 knots",
    calories: 248,
    difficulty: "easy",
    categories: ["air-fryer", "sides"],
    diets: ["keto", "low-carb", "gluten-free", "vegetarian"],
    cuisine: "American",
    featured: true,
    author: "Hearth Test Kitchen",
    published: "2026-03-12",
    ingredients: [
      { quantity: 1.5, unit: "cup", label: "shredded low-moisture mozzarella", group: "Dough" },
      { quantity: 2, unit: "tbsp", label: "cream cheese", group: "Dough" },
      { quantity: 0.75, unit: "cup", label: "superfine almond flour", group: "Dough" },
      { quantity: 1, unit: "", label: "large egg, beaten", group: "Dough" },
      { quantity: 0.5, unit: "tsp", label: "baking powder", group: "Dough" },
      { quantity: 0.5, unit: "tsp", label: "kosher salt", group: "Dough" },
      { quantity: 0.5, unit: "tsp", label: "Italian seasoning", group: "Dough" },
      { quantity: 2, unit: "tbsp", label: "unsalted butter", group: "Garlic butter" },
      { quantity: 3, unit: "clove", label: "garlic, minced", group: "Garlic butter" },
      { quantity: 1, unit: "tbsp", label: "chopped flat-leaf parsley", group: "Garlic butter" },
      { quantity: 1, unit: "pinch", label: "flaky salt", group: "Garlic butter" },
    ],
    steps: [
      {
        text: "Add mozzarella and cream cheese to a microwave-safe bowl. Heat 45–60 seconds, then stir until a smooth, stretchy mass forms. If there are still lumps, give it another 15 seconds.",
        minutes: 1,
      },
      {
        text: "Work in almond flour, egg, baking powder, kosher salt, and Italian seasoning. Knead in the bowl until the dough is homogeneous and only slightly tacky. If it sticks, dust your hands with a pinch of almond flour.",
      },
      {
        text: "Divide into 8 equal pieces. Roll each into a 5-inch rope and tie a loose knot, tucking the ends underneath.",
      },
      {
        text: "Heat the air fryer to 350°F. Arrange knots in a single layer (work in batches if needed) and cook 5–7 minutes until puffed and deep golden at the edges.",
        minutes: 6,
      },
      {
        text: "While they cook, melt butter with garlic over low heat until fragrant, about 1 minute — do not brown. Stir in parsley.",
        minutes: 1,
      },
      {
        text: "Brush the hot knots generously with garlic butter, finish with flaky salt, and serve immediately.",
      },
    ],
    notes: [
      "Low-moisture mozzarella is the whole structure here. Fresh mozzarella is too wet and the dough will slack.",
      "A 350°F air fryer is more honest than 400°F — the knots brown before the inside sets at the higher temp.",
    ],
    nutrition: { calories: 248, protein: 14, carbs: 5, fat: 19, fiber: 2, sugar: 1, sodium: 420 },
  },
  {
    slug: "lemon-herb-sheet-pan-chicken",
    title: "Lemon Herb Sheet-Pan Chicken",
    dek: "Crisp thighs, blistered lemons, potatoes that drink the pan juices.",
    story:
      "This is the dinner that makes the rest of the week feel handled. Chicken thighs go on a sheet pan with baby potatoes and lemon halves; the lemons collapse and sweeten, the potatoes catch the fat, and you only wash one pan. Thyme and garlic do the rest.",
    image: assetUrl("recipes/lemon-chicken.jpg"),
    imageAlt: "Roasted chicken thighs with lemon halves, potatoes, and thyme on a sheet pan",
    prepMinutes: 15,
    cookMinutes: 40,
    servings: 4,
    yieldLabel: "4 servings",
    calories: 512,
    difficulty: "easy",
    categories: ["weeknight", "meat"],
    diets: ["gluten-free"],
    cuisine: "Mediterranean",
    author: "Hearth Test Kitchen",
    published: "2026-02-04",
    ingredients: [
      { quantity: 2, unit: "lb", label: "bone-in, skin-on chicken thighs" },
      { quantity: 1.5, unit: "lb", label: "baby potatoes, halved" },
      { quantity: 2, unit: "", label: "lemons, halved" },
      { quantity: 6, unit: "clove", label: "garlic, smashed" },
      { quantity: 8, unit: "sprig", label: "fresh thyme" },
      { quantity: 3, unit: "tbsp", label: "olive oil" },
      { quantity: 1.25, unit: "tsp", label: "kosher salt" },
      { quantity: 0.75, unit: "tsp", label: "freshly ground black pepper" },
    ],
    steps: [
      {
        text: "Heat the oven to 425°F. Pat the thighs very dry — wet skin will steam, not crisp.",
      },
      {
        text: "On a rimmed sheet pan, toss potatoes, lemon halves, garlic, and thyme with 2 tablespoons oil, ¾ teaspoon salt, and half the pepper. Spread in a single layer.",
      },
      {
        text: "Rub the thighs with the remaining oil, salt, and pepper. Nestle them skin-side up among the potatoes, giving each piece a little air.",
      },
      {
        text: "Roast 38–42 minutes, until the skin is deep amber and a thermometer in the thickest thigh reads 175°F. Rest 5 minutes. Squeeze the roasted lemons over everything before serving.",
        minutes: 40,
      },
    ],
    notes: [
      "175°F is correct for thighs. They are done when the juices run clear and the meat pulls from the bone without a fight.",
      "If the potatoes lag, pull the chicken and give the pan 5 more minutes.",
    ],
    nutrition: { calories: 512, protein: 34, carbs: 28, fat: 30, fiber: 3, sugar: 2, sodium: 780 },
  },
  {
    slug: "charred-broccolini",
    title: "Charred Broccolini with Chili Oil",
    dek: "Blistered stems, toasted garlic, a chili oil that actually clings.",
    story:
      "Broccolini wants high heat and not much else. A ripping-hot skillet blackens the florets and sweetens the stems; garlic and chili oil go on off-heat so they perfume rather than scorch. It is a side that eats like the main event if you add a fried egg.",
    image: assetUrl("recipes/broccolini.jpg"),
    imageAlt: "Charred broccolini with chili oil and garlic on a dark ceramic plate",
    prepMinutes: 8,
    cookMinutes: 10,
    servings: 4,
    yieldLabel: "4 sides",
    calories: 142,
    difficulty: "easy",
    categories: ["sides", "weeknight", "vegetarian"],
    diets: ["keto", "low-carb", "vegetarian", "gluten-free"],
    cuisine: "American",
    author: "Hearth Test Kitchen",
    published: "2026-01-18",
    ingredients: [
      { quantity: 1, unit: "lb", label: "broccolini, trimmed" },
      { quantity: 2, unit: "tbsp", label: "olive oil" },
      { quantity: 3, unit: "clove", label: "garlic, thinly sliced" },
      { quantity: 1, unit: "tbsp", label: "chili crisp or chili oil" },
      { quantity: 0.5, unit: "tsp", label: "kosher salt" },
      { quantity: 0.5, unit: "", label: "lemon, for squeezing" },
    ],
    steps: [
      {
        text: "Heat a large cast-iron skillet over medium-high until it just starts to smoke. Toss broccolini with 1 tablespoon oil and the salt.",
      },
      {
        text: "Sear in a single layer, turning once, until charred in spots and the stems yield to a knife, 7–8 minutes. Work in batches if the pan is crowded.",
        minutes: 8,
      },
      {
        text: "Drop the heat to low. Add remaining oil and garlic; cook 30 seconds until the garlic turns pale gold. Pull off heat, drizzle chili oil, and toss.",
      },
      {
        text: "Finish with lemon juice at the table.",
      },
    ],
    notes: [
      "If the stems are thick, split them lengthwise so they cook in the same window as the florets.",
    ],
    nutrition: { calories: 142, protein: 4, carbs: 8, fat: 11, fiber: 3, sugar: 2, sodium: 310 },
  },
  {
    slug: "miso-butter-salmon",
    title: "Miso Butter Salmon",
    dek: "A six-minute glaze. Lacquered, salty-sweet, weeknight-proof.",
    story:
      "White miso and butter make a glaze that looks like you tried. You did not. Stir them together, paint the salmon, roast until the edges caramelize. Sesame and scallion at the end are the only garnish this needs.",
    image: assetUrl("recipes/miso-salmon.jpg"),
    imageAlt: "Miso-butter glazed salmon fillet with sesame and scallions",
    prepMinutes: 10,
    cookMinutes: 12,
    servings: 4,
    yieldLabel: "4 fillets",
    calories: 428,
    difficulty: "easy",
    categories: ["weeknight", "seafood"],
    diets: ["low-carb", "gluten-free"],
    cuisine: "Japanese-American",
    author: "Hearth Test Kitchen",
    published: "2026-04-02",
    ingredients: [
      { quantity: 4, unit: "", label: "salmon fillets (6 oz each), skin on" },
      { quantity: 2, unit: "tbsp", label: "white miso" },
      { quantity: 2, unit: "tbsp", label: "unsalted butter, softened" },
      { quantity: 1, unit: "tbsp", label: "honey" },
      { quantity: 1, unit: "tsp", label: "rice vinegar" },
      { quantity: 1, unit: "tsp", label: "toasted sesame oil" },
      { quantity: 2, unit: "", label: "scallions, thinly sliced" },
      { quantity: 1, unit: "tsp", label: "toasted sesame seeds" },
    ],
    steps: [
      {
        text: "Heat the oven to 400°F. Line a small sheet pan with parchment. Stir miso, butter, honey, vinegar, and sesame oil into a smooth paste.",
      },
      {
        text: "Pat the salmon dry. Place skin-side down and spread the glaze over the flesh.",
      },
      {
        text: "Roast 10–12 minutes, until the glaze is bubbling and a fork meets only the slightest resistance in the center. Broil 1 minute if you want more color.",
        minutes: 12,
      },
      {
        text: "Scatter scallions and sesame. Serve with rice or the charred broccolini.",
      },
    ],
    notes: [
      "If your miso is very salty, skip extra salt on the fish. Taste the glaze first.",
      "Center-cut fillets cook more evenly than tail pieces.",
    ],
    nutrition: { calories: 428, protein: 35, carbs: 8, fat: 28, fiber: 0, sugar: 5, sodium: 640 },
  },
  {
    slug: "brown-butter-banana-bread",
    title: "Brown Butter Banana Bread",
    dek: "One bowl, a nutty crust, the loaf you actually want tomorrow.",
    story:
      "Browning the butter is the entire personality of this loaf. It takes four extra minutes and turns a Tuesday banana bread into something that smells like toasted hazelnuts. Use bananas that have gone fully black — underripe fruit makes a polite, dry cake.",
    image: assetUrl("recipes/banana-bread.jpg"),
    imageAlt: "Sliced brown-butter banana bread with a caramelized crust on a walnut board",
    prepMinutes: 20,
    cookMinutes: 55,
    servings: 10,
    yieldLabel: "1 loaf",
    calories: 286,
    difficulty: "easy",
    categories: ["baking"],
    diets: ["vegetarian"],
    cuisine: "American",
    author: "Hearth Test Kitchen",
    published: "2026-01-09",
    ingredients: [
      { quantity: 0.5, unit: "cup", label: "unsalted butter" },
      { quantity: 3, unit: "", label: "very ripe bananas, mashed (about 1¼ cups)" },
      { quantity: 0.75, unit: "cup", label: "packed dark brown sugar" },
      { quantity: 2, unit: "", label: "large eggs" },
      { quantity: 1, unit: "tsp", label: "vanilla extract" },
      { quantity: 1.5, unit: "cup", label: "all-purpose flour" },
      { quantity: 1, unit: "tsp", label: "baking soda" },
      { quantity: 0.75, unit: "tsp", label: "kosher salt" },
      { quantity: 0.5, unit: "tsp", label: "ground cinnamon" },
      { quantity: 0.5, unit: "cup", label: "chopped walnuts", optional: true },
    ],
    steps: [
      {
        text: "Heat the oven to 350°F. Butter a 9×5-inch loaf pan and line it with a parchment sling.",
      },
      {
        text: "Melt butter in a light-colored saucepan over medium heat. Cook, swirling, until the foam subsides and the milk solids turn amber and smell nutty, 4–6 minutes. Cool 5 minutes.",
        minutes: 6,
      },
      {
        text: "Whisk bananas, brown sugar, eggs, and vanilla into the brown butter. Fold in flour, baking soda, salt, cinnamon, and walnuts until no dry streaks remain. Do not beat.",
      },
      {
        text: "Scrape into the pan and bake 50–58 minutes, until a skewer comes out with a few moist crumbs. Cool in the pan 15 minutes, then lift out to finish cooling.",
        minutes: 55,
      },
    ],
    notes: [
      "The loaf slices cleanest the next day. Wrap it once it is fully cool.",
      "If the top browns before the center sets, tent loosely with foil at the 40-minute mark.",
    ],
    nutrition: { calories: 286, protein: 5, carbs: 38, fat: 13, fiber: 2, sugar: 20, sodium: 280 },
  },
  {
    slug: "chickpea-caesar",
    title: "Crispy Chickpea Caesar",
    dek: "Roasted chickpeas instead of croutons. The dressing is not shy.",
    story:
      "A Caesar should taste like anchovy, lemon, and black pepper — not like a spa. We roast chickpeas until they rattle in the pan, then toss torn romaine with a dressing emulsified in a jar. Parmesan goes on in shards, not dust.",
    image: assetUrl("recipes/chickpea-caesar.jpg"),
    imageAlt: "Caesar salad with roasted chickpeas, romaine, and shaved parmesan",
    prepMinutes: 15,
    cookMinutes: 25,
    servings: 4,
    yieldLabel: "4 salads",
    calories: 364,
    difficulty: "easy",
    categories: ["salads", "weeknight", "vegetarian"],
    diets: ["vegetarian", "gluten-free"],
    cuisine: "American",
    author: "Hearth Test Kitchen",
    published: "2026-03-01",
    ingredients: [
      { quantity: 1, unit: "", label: "can (15 oz) chickpeas, drained and dried", group: "Chickpeas" },
      { quantity: 1, unit: "tbsp", label: "olive oil", group: "Chickpeas" },
      { quantity: 0.5, unit: "tsp", label: "kosher salt", group: "Chickpeas" },
      { quantity: 0.5, unit: "tsp", label: "smoked paprika", group: "Chickpeas" },
      { quantity: 1, unit: "", label: "large garlic clove", group: "Dressing" },
      { quantity: 3, unit: "", label: "anchovy fillets", group: "Dressing", optional: true },
      { quantity: 1, unit: "", label: "egg yolk", group: "Dressing" },
      { quantity: 1, unit: "tbsp", label: "lemon juice", group: "Dressing" },
      { quantity: 1, unit: "tsp", label: "Dijon mustard", group: "Dressing" },
      { quantity: 0.33, unit: "cup", label: "olive oil", group: "Dressing" },
      { quantity: 0.25, unit: "cup", label: "finely grated Parmesan, plus shards to finish", group: "Dressing" },
      { quantity: 2, unit: "", label: "romaine hearts, torn", group: "Salad" },
      { quantity: 1, unit: "tsp", label: "coarsely ground black pepper", group: "Salad" },
    ],
    steps: [
      {
        text: "Heat the oven to 425°F. Toss well-dried chickpeas with oil, salt, and paprika. Roast on a sheet pan 22–26 minutes, shaking once, until deep gold and crisp.",
        minutes: 25,
      },
      {
        text: "Mash garlic and anchovy to a paste. Whisk with yolk, lemon, and mustard, then stream in oil until thick. Fold in grated Parmesan. Season with pepper.",
      },
      {
        text: "Toss romaine with enough dressing to gloss the leaves. Top with chickpeas, Parmesan shards, and more pepper.",
      },
    ],
    notes: [
      "Skip the anchovy for a vegetarian bowl and add an extra pinch of salt plus a dash of Worcestershire if you use a vegetarian version.",
      "Chickpeas crisp only if they are dry. Roll them in a towel after draining.",
    ],
    nutrition: { calories: 364, protein: 12, carbs: 22, fat: 26, fiber: 7, sugar: 4, sodium: 520 },
  },
  {
    slug: "tomato-basil-soup",
    title: "Creamy Tomato Basil Soup",
    dek: "Canned tomatoes, real cream, a grilled cheese on the side.",
    story:
      "In January, the best tomatoes live in a can. We cook them down with onion, garlic, and a pinch of sugar to round the acid, then blend until the soup looks like velvet. Basil goes in off the heat so it stays green. The sandwich is not optional.",
    image: assetUrl("recipes/tomato-soup.jpg"),
    imageAlt: "Tomato basil soup in a terracotta bowl with a grilled cheese sandwich",
    prepMinutes: 12,
    cookMinutes: 30,
    servings: 4,
    yieldLabel: "4 bowls",
    calories: 318,
    difficulty: "easy",
    categories: ["soups", "weeknight", "vegetarian"],
    diets: ["vegetarian", "gluten-free"],
    cuisine: "American",
    author: "Hearth Test Kitchen",
    published: "2026-02-16",
    ingredients: [
      { quantity: 2, unit: "tbsp", label: "olive oil" },
      { quantity: 1, unit: "", label: "yellow onion, chopped" },
      { quantity: 3, unit: "clove", label: "garlic, sliced" },
      { quantity: 1, unit: "tbsp", label: "tomato paste" },
      { quantity: 2, unit: "", label: "cans (28 oz each) whole peeled tomatoes" },
      { quantity: 1, unit: "cup", label: "vegetable or chicken stock" },
      { quantity: 1, unit: "tsp", label: "sugar" },
      { quantity: 0.75, unit: "tsp", label: "kosher salt" },
      { quantity: 0.5, unit: "cup", label: "heavy cream" },
      { quantity: 0.5, unit: "cup", label: "fresh basil leaves" },
    ],
    steps: [
      {
        text: "Warm oil in a heavy pot over medium heat. Cook onion with a pinch of salt until translucent, 6–8 minutes. Add garlic and tomato paste; cook 1 minute until the paste darkens.",
        minutes: 8,
      },
      {
        text: "Add tomatoes with their juices, stock, sugar, and remaining salt. Crush the tomatoes against the pot. Simmer uncovered 18–20 minutes.",
        minutes: 20,
      },
      {
        text: "Blend until completely smooth (a stick blender is fine). Return to the pot, stir in cream, and tear in basil. Taste for salt. Do not boil after the cream goes in.",
      },
    ],
    notes: [
      "San Marzano-style tomatoes make a sweeter soup. Cheap acidic cans need the full teaspoon of sugar.",
      "For a dairy-free bowl, swap the cream for ⅓ cup olive oil blended in at the end.",
    ],
    nutrition: { calories: 318, protein: 6, carbs: 24, fat: 22, fiber: 5, sugar: 14, sodium: 890 },
  },
  {
    slug: "ginger-scallion-noodles",
    title: "Ginger Scallion Noodles",
    dek: "A jar of scallion oil, a pot of noodles, dinner in twelve minutes.",
    story:
      "This is the noodle bowl we make when the fridge is a suggestion. A flood of ginger and scallion blooms in hot oil; soy and a little sugar turn it into a sauce that coats every strand. Chili crisp is the optional argument at the table.",
    image: assetUrl("recipes/ginger-noodles.jpg"),
    imageAlt: "Glossy ginger scallion noodles in a charcoal bowl with chili crisp",
    prepMinutes: 10,
    cookMinutes: 8,
    servings: 2,
    yieldLabel: "2 bowls",
    calories: 492,
    difficulty: "easy",
    categories: ["weeknight", "vegetarian"],
    diets: ["vegetarian"],
    cuisine: "Chinese-American",
    author: "Hearth Test Kitchen",
    published: "2026-03-22",
    ingredients: [
      { quantity: 8, unit: "oz", label: "fresh or dried wheat noodles" },
      { quantity: 1, unit: "bunch", label: "scallions, thinly sliced" },
      { quantity: 3, unit: "tbsp", label: "minced fresh ginger" },
      { quantity: 0.33, unit: "cup", label: "neutral oil" },
      { quantity: 2, unit: "tbsp", label: "soy sauce" },
      { quantity: 1, unit: "tsp", label: "sugar" },
      { quantity: 1, unit: "tsp", label: "toasted sesame oil" },
      { quantity: 1, unit: "tbsp", label: "chili crisp", optional: true },
    ],
    steps: [
      {
        text: "Cook noodles in salted water until just shy of tender. Reserve ¼ cup pasta water and drain.",
        minutes: 6,
      },
      {
        text: "Pile scallions and ginger in a heatproof bowl. Heat the neutral oil until it shimmers and a scallion sizzles on contact. Pour the oil over the aromatics — it should hiss. Stir in soy, sugar, and sesame oil.",
      },
      {
        text: "Toss noodles with the sauce and a splash of pasta water until glossy. Finish with chili crisp.",
      },
    ],
    notes: [
      "The oil must be hot enough to wilt the scallions on contact. If it does not hiss, it is not ready.",
    ],
    nutrition: { calories: 492, protein: 12, carbs: 58, fat: 24, fiber: 3, sugar: 5, sodium: 980 },
  },
  {
    slug: "olive-oil-chocolate-cake",
    title: "Dark Chocolate Olive Oil Cake",
    dek: "No mixer. A fudgy crumb that stays moist for days.",
    story:
      "Olive oil does what butter cannot in a chocolate cake: it keeps the crumb plush after day one. Use a fruity oil you would put on bread. Cocoa and espresso powder deepen the chocolate without making it bitter. Serve it plain, or with a pour of cream.",
    image: assetUrl("recipes/chocolate-cake.jpg"),
    imageAlt: "Dark chocolate olive oil cake with a slice removed, dusted with cocoa",
    prepMinutes: 15,
    cookMinutes: 35,
    servings: 10,
    yieldLabel: "1 cake",
    calories: 342,
    difficulty: "easy",
    categories: ["baking", "vegetarian"],
    diets: ["vegetarian"],
    cuisine: "Mediterranean",
    author: "Hearth Test Kitchen",
    published: "2026-02-08",
    ingredients: [
      { quantity: 1.5, unit: "cup", label: "all-purpose flour" },
      { quantity: 0.75, unit: "cup", label: "unsweetened cocoa powder" },
      { quantity: 1.25, unit: "cup", label: "sugar" },
      { quantity: 1.5, unit: "tsp", label: "baking soda" },
      { quantity: 0.75, unit: "tsp", label: "kosher salt" },
      { quantity: 1, unit: "tsp", label: "espresso powder", optional: true },
      { quantity: 0.75, unit: "cup", label: "extra-virgin olive oil" },
      { quantity: 2, unit: "", label: "large eggs" },
      { quantity: 1, unit: "cup", label: "whole milk" },
      { quantity: 2, unit: "tsp", label: "vanilla extract" },
      { quantity: 0.5, unit: "cup", label: "hot coffee or water" },
    ],
    steps: [
      {
        text: "Heat the oven to 350°F. Oil a 9-inch round pan and line the bottom with parchment.",
      },
      {
        text: "Whisk flour, cocoa, sugar, baking soda, salt, and espresso. In another bowl, whisk oil, eggs, milk, and vanilla. Pour wet into dry, then stream in hot coffee and whisk until smooth. The batter will be thin.",
      },
      {
        text: "Bake 32–38 minutes, until the center springs back and a tester has a few damp crumbs. Cool 15 minutes in the pan, then turn out. Dust with cocoa to serve.",
        minutes: 35,
      },
    ],
    notes: [
      "This cake is better on day two. Wrap it once cool.",
      "A peppery olive oil will show. Use something round and fruity.",
    ],
    nutrition: { calories: 342, protein: 5, carbs: 38, fat: 20, fiber: 3, sugar: 22, sodium: 310 },
  },
  {
    slug: "roasted-squash-risotto",
    title: "Roasted Squash Risotto",
    dek: "Caramelized squash, fried sage, the stirring is the point.",
    story:
      "Risotto is not hard. It is attentive. Roast the squash until the edges catch, then stir hot stock into arborio until the rice goes creamy but still has a bite. Sage fried in brown butter is the whole flourish.",
    image: assetUrl("recipes/squash-risotto.jpg"),
    imageAlt: "Roasted squash risotto with fried sage and pecorino in a shallow bowl",
    prepMinutes: 20,
    cookMinutes: 40,
    servings: 4,
    yieldLabel: "4 bowls",
    calories: 486,
    difficulty: "medium",
    categories: ["vegetarian", "weeknight"],
    diets: ["vegetarian", "gluten-free"],
    cuisine: "Italian",
    author: "Hearth Test Kitchen",
    published: "2026-01-28",
    ingredients: [
      { quantity: 1.5, unit: "lb", label: "butternut squash, peeled and cubed" },
      { quantity: 2, unit: "tbsp", label: "olive oil" },
      { quantity: 5, unit: "cup", label: "hot chicken or vegetable stock" },
      { quantity: 2, unit: "tbsp", label: "unsalted butter" },
      { quantity: 1, unit: "", label: "small onion, minced" },
      { quantity: 1.5, unit: "cup", label: "arborio rice" },
      { quantity: 0.5, unit: "cup", label: "dry white wine" },
      { quantity: 0.75, unit: "cup", label: "grated pecorino or Parmesan" },
      { quantity: 12, unit: "leaf", label: "fresh sage" },
      { quantity: 0.75, unit: "tsp", label: "kosher salt" },
    ],
    steps: [
      {
        text: "Heat the oven to 425°F. Toss squash with 1 tablespoon oil and ¼ teaspoon salt. Roast 25–30 minutes until browned at the edges.",
        minutes: 28,
      },
      {
        text: "Keep stock simmering in a small pot. In a wide pan, melt 1 tablespoon butter with remaining oil. Cook onion until soft. Add rice and stir 1 minute until the edges look translucent.",
      },
      {
        text: "Add wine; stir until absorbed. Add stock a ladle at a time, stirring often, until the rice is creamy and just tender, 18–22 minutes.",
        minutes: 20,
      },
      {
        text: "Fold in squash, cheese, remaining salt, and remaining butter. In a tiny skillet, fry sage in a smear of butter until crisp, 30 seconds. Scatter over bowls.",
      },
    ],
    notes: [
      "The rice should flow slowly when you tip the pan — looser than mashed potatoes, tighter than soup. Add a splash of stock if it seizes as it sits.",
    ],
    nutrition: { calories: 486, protein: 14, carbs: 68, fat: 16, fiber: 5, sugar: 6, sodium: 820 },
  },
  {
    slug: "weeknight-pork-stir-fry",
    title: "Weeknight Pork Stir-Fry",
    dek: "Velveted pork, snap peas, a glossy ginger-soy sauce.",
    story:
      "Velveting is a five-minute marinade with cornstarch and a little soy that keeps cheap pork tender in a hot pan. After that it is mise en place and heat: pork first, vegetables second, sauce last so it clings instead of steaming.",
    image: assetUrl("recipes/pork-stirfry.jpg"),
    imageAlt: "Glazed pork stir-fry with peppers, snap peas, and carrots",
    prepMinutes: 20,
    cookMinutes: 12,
    servings: 4,
    yieldLabel: "4 servings",
    calories: 398,
    difficulty: "medium",
    categories: ["weeknight", "meat"],
    diets: ["low-carb"],
    cuisine: "Chinese-American",
    author: "Hearth Test Kitchen",
    published: "2026-04-11",
    ingredients: [
      { quantity: 1, unit: "lb", label: "pork loin, sliced thin against the grain", group: "Pork" },
      { quantity: 1, unit: "tbsp", label: "soy sauce", group: "Pork" },
      { quantity: 1, unit: "tsp", label: "cornstarch", group: "Pork" },
      { quantity: 1, unit: "tsp", label: "neutral oil", group: "Pork" },
      { quantity: 2, unit: "tbsp", label: "neutral oil", group: "Stir-fry" },
      { quantity: 2, unit: "cup", label: "snap peas" },
      { quantity: 1, unit: "", label: "red bell pepper, sliced" },
      { quantity: 1, unit: "", label: "carrot, cut on a bias" },
      { quantity: 1, unit: "tbsp", label: "minced ginger", group: "Sauce" },
      { quantity: 2, unit: "clove", label: "garlic, minced", group: "Sauce" },
      { quantity: 3, unit: "tbsp", label: "soy sauce", group: "Sauce" },
      { quantity: 1, unit: "tbsp", label: "rice vinegar", group: "Sauce" },
      { quantity: 1, unit: "tsp", label: "brown sugar", group: "Sauce" },
      { quantity: 1, unit: "tsp", label: "toasted sesame oil", group: "Sauce" },
    ],
    steps: [
      {
        text: "Toss pork with soy, cornstarch, and 1 teaspoon oil. Rest 10 minutes. Stir sauce ingredients together in a cup.",
        minutes: 10,
      },
      {
        text: "Heat 1 tablespoon oil in a wok or large skillet over high until it smokes. Sear pork in a single layer, 90 seconds a side, then transfer to a plate.",
      },
      {
        text: "Add remaining oil, then snap peas, pepper, and carrot. Stir-fry 2–3 minutes until crisp-tender. Return pork, pour in sauce, and toss 30 seconds until glossy.",
        minutes: 4,
      },
    ],
    notes: [
      "Crowding the pan steams the pork. If your skillet is modest, cook the meat in two batches.",
    ],
    nutrition: { calories: 398, protein: 32, carbs: 16, fat: 22, fiber: 3, sugar: 7, sodium: 980 },
  },
  {
    slug: "honey-fig-breakfast-jar",
    title: "Honey Fig Breakfast Jar",
    dek: "Oats, yogurt, and figs you can pack the night before.",
    story:
      "This is breakfast that does the work while you sleep. Rolled oats soften in yogurt and a little milk; in the morning you add honey, walnuts, and whatever fruit is actually ripe. Figs are the version we make in late summer. Berries take the night shift the rest of the year.",
    image: assetUrl("recipes/overnight-oats.jpg"),
    imageAlt: "Breakfast jar of oats and yogurt layered with fruit, honey, and walnuts",
    prepMinutes: 10,
    cookMinutes: 0,
    servings: 2,
    yieldLabel: "2 jars",
    calories: 412,
    difficulty: "easy",
    categories: ["breakfast", "vegetarian"],
    diets: ["vegetarian"],
    cuisine: "American",
    author: "Hearth Test Kitchen",
    published: "2026-03-08",
    ingredients: [
      { quantity: 1, unit: "cup", label: "old-fashioned rolled oats" },
      { quantity: 1, unit: "cup", label: "plain whole-milk yogurt" },
      { quantity: 0.5, unit: "cup", label: "milk" },
      { quantity: 2, unit: "tbsp", label: "honey, plus more to finish" },
      { quantity: 0.5, unit: "tsp", label: "vanilla extract" },
      { quantity: 1, unit: "pinch", label: "kosher salt" },
      { quantity: 4, unit: "", label: "fresh figs, sliced (or 1 cup berries)" },
      { quantity: 0.25, unit: "cup", label: "toasted walnuts, chopped" },
    ],
    steps: [
      {
        text: "Stir oats, yogurt, milk, honey, vanilla, and salt. Divide between two jars. Cover and refrigerate at least 4 hours, or overnight.",
        minutes: 5,
      },
      {
        text: "In the morning, top with figs, walnuts, and another thread of honey. Eat cold, or let the jar sit on the counter 10 minutes if you prefer it less chilled.",
      },
    ],
    notes: [
      "Rolled oats, not instant and not steel-cut. Instant turns to paste; steel-cut stays raw.",
      "The jars keep 2 days. Add fruit and nuts just before eating so they stay crisp.",
    ],
    nutrition: { calories: 412, protein: 14, carbs: 58, fat: 15, fiber: 6, sugar: 28, sodium: 140 },
  },
];

export const collections: Collection[] = [
  {
    slug: "keto",
    title: "Keto & Low Carb",
    dek: "High flavor, low starch — the recipes we actually cook on a Tuesday.",
    image: assetUrl("recipes/garlic-knots.jpg"),
    recipeSlugs: [
      "air-fryer-garlic-knots",
      "miso-butter-salmon",
      "charred-broccolini",
      "weeknight-pork-stir-fry",
    ],
  },
  {
    slug: "weeknight",
    title: "Weeknight",
    dek: "On the table in under forty-five minutes, without tasting like it.",
    image: assetUrl("recipes/lemon-chicken.jpg"),
    recipeSlugs: [
      "lemon-herb-sheet-pan-chicken",
      "miso-butter-salmon",
      "ginger-scallion-noodles",
      "weeknight-pork-stir-fry",
      "tomato-basil-soup",
      "chickpea-caesar",
    ],
  },
  {
    slug: "air-fryer",
    title: "Air Fryer",
    dek: "Crisp without the oil bath. Start with the garlic knots.",
    image: assetUrl("recipes/garlic-knots.jpg"),
    recipeSlugs: ["air-fryer-garlic-knots"],
  },
  {
    slug: "vegetarian",
    title: "Vegetable-first",
    dek: "Bowls and sides that do not apologize for skipping the meat.",
    image: assetUrl("recipes/squash-risotto.jpg"),
    recipeSlugs: [
      "charred-broccolini",
      "chickpea-caesar",
      "tomato-basil-soup",
      "ginger-scallion-noodles",
      "roasted-squash-risotto",
      "honey-fig-breakfast-jar",
      "olive-oil-chocolate-cake",
      "brown-butter-banana-bread",
    ],
  },
  {
    slug: "baking",
    title: "Baking",
    dek: "Loaves and cakes that earn the counter space.",
    image: assetUrl("recipes/chocolate-cake.jpg"),
    recipeSlugs: ["brown-butter-banana-bread", "olive-oil-chocolate-cake"],
  },
  {
    slug: "one-pan",
    title: "One pan",
    dek: "Sheet pans, skillets, and a single pot of soup.",
    image: assetUrl("recipes/lemon-chicken.jpg"),
    recipeSlugs: [
      "lemon-herb-sheet-pan-chicken",
      "miso-butter-salmon",
      "tomato-basil-soup",
      "weeknight-pork-stir-fry",
      "charred-broccolini",
    ],
  },
];

export function getRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function recipesInCollection(col: Collection): Recipe[] {
  return col.recipeSlugs
    .map((s) => getRecipe(s))
    .filter((r): r is Recipe => Boolean(r));
}

export function relatedRecipes(recipe: Recipe, limit = 3): Recipe[] {
  const scored = recipes
    .filter((r) => r.slug !== recipe.slug)
    .map((r) => {
      const cat = r.categories.filter((c) => recipe.categories.includes(c)).length;
      const diet = r.diets.filter((d) => recipe.diets.includes(d)).length;
      return { r, score: cat * 2 + diet };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

export function recipeHaystack(r: Recipe): string {
  return [r.title, r.dek, r.story, ...r.ingredients.map((i) => i.label), ...r.categories, ...r.diets]
    .join(" ")
    .toLowerCase();
}

export function filterRecipes(opts: { q?: string; cat?: string; diet?: string }): Recipe[] {
  const q = opts.q?.trim().toLowerCase() ?? "";
  return recipes.filter((r) => {
    if (opts.cat && opts.cat !== "all") {
      const inCat = r.categories.includes(opts.cat);
      const col = collections.find((c) => c.slug === opts.cat);
      const inCol = col ? col.recipeSlugs.includes(r.slug) : false;
      if (!inCat && !inCol) return false;
    }
    if (opts.diet && !r.diets.includes(opts.diet)) return false;
    if (!q) return true;
    return recipeHaystack(r).includes(q);
  });
}

export const featuredRecipe = recipes.find((r) => r.featured) ?? recipes[0];
