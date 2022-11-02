import type { Ingredients, MaybeIngredients, Recipe } from './types';

export const ingredientNames = [
	{ name: 'espresso', c: 0, m: 40, y: 65, k: 82, alpha: 100 },
	{ name: 'microfoam', c: 2, m: 2, y: 2, k: 0, alpha: 20 },
	{ name: 'steamed milk', c: 3, m: 4, y: 8, k: 2, alpha: 30 },
	{ name: 'hot water', c: 10, m: 0, y: 0, k: 0, alpha: 1 },
	{ name: 'chocolate', c: 0, m: 40, y: 65, k: 72, alpha: 80 }
];

export const makeIngredients = (obj: MaybeIngredients): Ingredients => {
	return [
		obj.espresso ?? 0,
		obj.microfoam ?? 0,
		obj.steamedMilk ?? 0,
		obj.hotWater ?? 0,
		obj.chocolate ?? 0
	];
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
	display = true
): Recipe => {
	return { name: name, display: display, ingredients: makeIngredients(obj) };
};
