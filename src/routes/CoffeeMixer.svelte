<script lang="ts">
	import { calculateClosestDrink, normalizeIngredients } from './coffee';
	import { ingredientNames } from './ingredients';
	import IngredientSlider from './IngredientSlider.svelte';
	import RecipePicker from './RecipePicker.svelte';
	import { recipes } from './recipes';
	import type { Recipe, Ingredients } from './types';

	const threshold = 10;

	let drinkMass = 15;
	let closestDrink = { name: 'espresso', distance: 0 };
	let sliderValues = normalizeIngredients(recipes[0].ingredients);

	$: sliderSum = sliderValues.reduce((a, b) => a + b);
	$: currentIngredients = sliderValues.map((e) => (e / sliderSum) * drinkMass) as Ingredients;
	$: closestDrink = calculateClosestDrink(recipes, currentIngredients);

	$: if (sliderValues.every((v) => v == 0)) {
		sliderValues[0] = 1;
	}

	function setIngredientsFromRecipe(recipeMessage: CustomEvent) {
		const recipe = recipeMessage.detail.recipe as Recipe;
		const newMass = recipeMessage.detail.newMass;
		const newSliderValues = normalizeIngredients(recipe.ingredients);
		newSliderValues.forEach((sliderValue, idx) => {
			sliderValues[idx] = sliderValue;
		});
		drinkMass = newMass;
	}
</script>

<div class="min-w-max w-1/2 m-auto">
	<div
		class="grid grid-cols-[10rem_auto_4rem] gap-1 w-auto m-auto bg-brown-200 rounded-md py-3 px-1 drop-shadow-md"
	>
		<IngredientSlider
			name="drink size"
			bind:currentValue={drinkMass}
			bind:currentMass={drinkMass}
			min="15"
			max="240"
			step="5"
			styleClass="bg-brown-600"
		/>
		{#each ingredientNames as coffeeIngredient, idx}
			<IngredientSlider
				name={coffeeIngredient.name}
				bind:currentValue={sliderValues[idx]}
				bind:currentMass={currentIngredients[idx]}
			/>
		{/each}
	</div>

	<RecipePicker
		bind:closestDrink
		bind:currentIngredients
		bind:drinkMass
		{threshold}
		on:message={setIngredientsFromRecipe}
	/>
</div>
