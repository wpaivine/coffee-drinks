export interface Recipe {
	name: string;
	display: boolean;
	ingredients: Ingredients;
}

/// Remember to update makeIngredients when you update this class
export type Ingredients = [
	espresso: number,
	microfoam: number,
	hotWater: number,
	steamedMilk: number,
	chocolate: number
];

/// Remember to update makeIngredients when you update this class
export class MaybeIngredients {
	espresso?: number;
	steamedMilk?: number;
	microfoam?: number;
	hotWater?: number;
	chocolate?: number;
}
