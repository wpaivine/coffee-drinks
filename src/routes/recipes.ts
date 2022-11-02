import { makeRecipe } from './ingredients';

export const recipes = [
	makeRecipe('espresso', { espresso: 16 }),
	makeRecipe('double espresso', { espresso: 32 }),
	makeRecipe('triple espresso', { espresso: 48 }),
	makeRecipe('macchiato', { espresso: 32, microfoam: 20 }),
	makeRecipe('macchiato', { espresso: 32, steamedMilk: 20 }, false),
	makeRecipe('cortado', { espresso: 32, steamedMilk: 20, microfoam: 20 }),
	makeRecipe('cortado', { espresso: 32, steamedMilk: 40 }, false),
	makeRecipe('capuccino', { espresso: 32, steamedMilk: 40, microfoam: 40 }),
	makeRecipe('cafe latte', { espresso: 32, steamedMilk: 168, microfoam: 40 }),
	makeRecipe('flat white', { espresso: 32, steamedMilk: 198, microfoam: 10 }),
	makeRecipe('flat white', { espresso: 32, steamedMilk: 218 }, false),
	makeRecipe('americano', { espresso: 32, hotWater: 208 }),
	makeRecipe('mocha', { espresso: 32, steamedMilk: 138, microfoam: 30, chocolate: 40 }),
	makeRecipe('mocha', { espresso: 32, steamedMilk: 168, chocolate: 40 }, false),
	makeRecipe('hot chocolate', { chocolate: 40, steamedMilk: 200 }),
	makeRecipe('steamer', { steamedMilk: 240 }),
	makeRecipe('steamer', { steamedMilk: 120, microfoam: 120 }, false),
	makeRecipe('steamer', { microfoam: 240 }, false),
	makeRecipe('hot water', { hotWater: 240 }, false)
];
