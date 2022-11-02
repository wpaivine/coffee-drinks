import { ingredientNames } from './ingredients';
import type { Ingredients, Recipe } from './types';

export const normalizeIngredients = (ingredients: Ingredients): Ingredients => {
	const total = ingredients.reduce((a, b) => a + b);
	return ingredients.map((e) => (e * 100) / total) as Ingredients;
};

export const calculateClosestDrink = (recipes: Recipe[], currentIngredients: Ingredients) => {
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
