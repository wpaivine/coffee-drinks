export interface Recipe {
	name: string;
	display: boolean;
	ingredients: Ingredients;
}

export type Ingredients = [
	espresso: number,
	microfoam: number,
	hotWater: number,
	steamedMilk: number,
	chocolate: number
];

export const ingredientNames = [
	{ name: 'espresso', c: 0, m: 40, y: 65, k: 82, alpha: 100 },
	{ name: 'microfoam', c: 2, m: 2, y: 2, k: 0, alpha: 20 },
	{ name: 'steamed milk', c: 3, m: 4, y: 8, k: 2, alpha: 30 },
	{ name: 'hot water', c: 10, m: 0, y: 0, k: 0, alpha: 1 },
	{ name: 'chocolate', c: 0, m: 40, y: 65, k: 72, alpha: 80 }
];

export const makeIngredients = (obj: {
	espresso?: number;
	steamedMilk?: number;
	microfoam?: number;
	hotWater?: number;
	chocolate?: number;
}): Ingredients => {
	return [
		obj.espresso ?? 0,
		obj.microfoam ?? 0,
		obj.steamedMilk ?? 0,
		obj.hotWater ?? 0,
		obj.chocolate ?? 0
	];
};

export const normalizeIngredients = (ingredients: Ingredients): Ingredients => {
	const total = ingredients.reduce((a, b) => a + b);
	return ingredients.map((e) => (e * 100) / total) as Ingredients;
};

export const makeRecipe = (
	name: string,
	obj: {
		espresso?: number;
		steamedMilk?: number;
		microfoam?: number;
		hotWater?: number;
		chocolate?: number;
	},
	display: boolean = true
): Recipe => {
	return { name: name, display: display, ingredients: makeIngredients(obj) };
};

export const recipes = [
	makeRecipe('espresso', { espresso: 16 }),
	makeRecipe('double espresso', { espresso: 32 }),
	makeRecipe('triple espresso', { espresso: 48 }),
	makeRecipe('macchiato', { espresso: 32, microfoam: 20 }),
	makeRecipe('cortado', { espresso: 32, steamedMilk: 20, microfoam: 20 }),
	makeRecipe('capuccino', { espresso: 32, steamedMilk: 40, microfoam: 40 }),
	makeRecipe('latte', { espresso: 32, steamedMilk: 168, microfoam: 40 }),
	makeRecipe('flat white', { espresso: 32, steamedMilk: 198, microfoam: 10 }),
	makeRecipe('americano', { espresso: 32, hotWater: 208 }),
	makeRecipe('mocha', { espresso: 32, steamedMilk: 138, microfoam: 30, chocolate: 40 }),
	makeRecipe('hot chocolate', { chocolate: 40, steamedMilk: 200 }),
	makeRecipe('steamer', { steamedMilk: 240 }),
	makeRecipe('steamer', { steamedMilk: 120, microfoam: 120 }, false),
	makeRecipe('steamer', { microfoam: 240 }, false),
	makeRecipe('hot water', { hotWater: 240 }, false)
];

export const calculateClosestDrink = (currentIngredients: Ingredients) => {
	const dists = recipes.map((recipe, i) => {
		return { dist: recipeDistance(recipe.ingredients, currentIngredients), idx: i };
	});
	const min = dists.reduce((prev, cur, _) => (cur.dist < prev.dist ? cur : prev));
	return { name: recipes[min.idx].name, distance: min.dist };
};

export const recipeDistance = (recipe: Ingredients, ingredients: Ingredients) => {
	const normalizedRecipe = normalizeIngredients(recipe);
	const normalizedIngredients = normalizeIngredients(ingredients);
	const distance = Math.sqrt(
		normalizedRecipe
			.map((value, index) => Math.pow(value - normalizedIngredients[index], 2))
			.reduce((prev, cur, _) => prev + cur)
	);
	const volumeDistance = Math.abs(
		recipe.reduce((a, b) => a + b) - ingredients.reduce((a, b) => a + b)
	);
	return distance + Math.pow(volumeDistance, 0.8);
};

export const calculateColor = (ingredients: Ingredients): string => {
	const amountsToUse = normalizeIngredients(ingredients);
	const alphaSum = amountsToUse
		.map((amount, idx) => (amount * ingredientNames[idx].alpha) / 100)
		.reduce((a, b) => a + b);
	const c =
		amountsToUse
			.map(
				(amount, idx) =>
					((amount / 100) * ingredientNames[idx].c * ingredientNames[idx].alpha) / 100
			)
			.reduce((a, b) => a + b) / alphaSum;
	const y =
		amountsToUse
			.map(
				(amount, idx) =>
					((amount / 100) * ingredientNames[idx].y * ingredientNames[idx].alpha) / 100
			)
			.reduce((a, b) => a + b) / alphaSum;
	const m =
		amountsToUse
			.map(
				(amount, idx) =>
					((amount / 100) * ingredientNames[idx].m * ingredientNames[idx].alpha) / 100
			)
			.reduce((a, b) => a + b) / alphaSum;
	const k =
		amountsToUse
			.map(
				(amount, idx) =>
					((amount / 100) * ingredientNames[idx].k * ingredientNames[idx].alpha) / 100
			)
			.reduce((a, b) => a + b) / alphaSum;

	const r = 255 * (1 - c) * (1 - k);
	const g = 255 * (1 - m) * (1 - k);
	const b = 255 * (1 - y) * (1 - k);
	return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};
