<script lang="ts">
	import { calculateClosestDrink, calculateColor, normalizeIngredients } from './coffee';
	import CoffeeCup from './CoffeeCup.svelte';
	import { ingredientNames } from './ingredients';
	import RecipePicker from './RecipePicker.svelte';
	import { recipes } from './recipes';
	import type { Recipe, Ingredients } from './types';

	const threshold = 10;

	let drinkMass = 15;

	let closestDrink = { name: 'espresso', distance: 0 };

	let sliderValues = normalizeIngredients(recipes[0].ingredients);

	let bonk = false;

	$: sliderSum = sliderValues.reduce((a, b) => a + b);
	$: currentIngredients = sliderValues.map((e) => (e / sliderSum) * drinkMass) as Ingredients;

	$: closestDrink = calculateClosestDrink(recipes, currentIngredients);

	$: if (sliderValues.every((v) => v == 0)) {
		sliderValues[0] = 1;
	}

	function setIngredientsFromRecipe(recipeMessage: CustomEvent) {
		const recipe = recipeMessage.detail as Recipe;
		const newMass = recipe.ingredients.reduce((a, b) => a + b);

		if (newMass == drinkMass) {
			bonk = true;
		} else {
			drinkMass = newMass;
		}

		const newSliderValues = normalizeIngredients(recipe.ingredients);
		newSliderValues.forEach((sliderValue, idx) => {
			sliderValues[idx] = sliderValue;
		});
	}
</script>

<div class="min-w-max w-1/2 m-auto">
	<div
		class="grid grid-cols-[10rem_auto_4rem] gap-1 w-auto m-auto bg-brown-200 rounded-md py-3 px-1 drop-shadow-md"
	>
		<div class="select-none">
			<span class="float-right font-body text-brown-900 text-xl px-1"> drink size </span>
		</div>
		<div>
			<input
				class="float-left rounded-xl overflow-hidden appearance-none bg-brown-600 w-full drop-shadow-md"
				type="range"
				bind:value={drinkMass}
				min="15"
				max="240"
				step="5"
			/>
		</div>
		<div>
			<span class="float-left px-4 font-body text-brown-900 text-l">
				{drinkMass}g
			</span>
		</div>
		{#each ingredientNames as coffeeIngredient, idx}
			<div class="select-none">
				<span class="float-right font-body text-brown-900 text-xl select-none px-1">
					{coffeeIngredient.name}
				</span>
			</div>
			<div class="select-none">
				<input
					class="ingredient float-right rounded-xl overflow-hidden appearance-none bg-brown-800 w-full drop-shadow-md"
					type="range"
					bind:value={sliderValues[idx]}
					min="0"
					max="100"
				/>
			</div>
			<div class="select-none">
				<span class="float-left px-4 font-body text-brown-900 text-l select-none">
					{Math.round(currentIngredients[idx])}g
				</span>
			</div>
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

<style>
	@media screen and (-webkit-min-device-pixel-ratio: 0) {
		input[type='range']::-webkit-slider-thumb {
			width: 1.5rem;
			-webkit-appearance: none;
			appearance: none;
			height: 1.75rem;
			background: #b6a391;
			border-radius: 0.75rem;
		}
	}
</style>
