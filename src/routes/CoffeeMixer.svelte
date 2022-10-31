<script lang="ts">
	import CoffeeCup from './CoffeeCup.svelte';
	import {
		calculateClosestDrink,
		calculateColor,
		ingredientNames,
		makeIngredients,
		normalizeIngredients,
		recipes,
		type Recipe,
		type Ingredients
	} from './types';

	const threshold = 10;

	let drinkMass = 15;

	let closestDrink = { name: 'espresso', distance: 0 };

	let sliderValues = normalizeIngredients(recipes[0].ingredients);

	$: sliderSum = sliderValues.reduce((a, b) => a + b);
	$: currentIngredients = sliderValues.map((e) => (e / sliderSum) * drinkMass) as Ingredients;

	$: closestDrink = calculateClosestDrink(currentIngredients);

	function setIngredientsFromRecipe(recipe: Recipe) {
		drinkMass = recipe.ingredients.reduce((a, b) => a + b);

		const newSliderValues = normalizeIngredients(recipe.ingredients);
		newSliderValues.forEach((sliderValue, idx) => {
			sliderValues[idx] = sliderValue;
		});
	}

	/*
<div style="visibility: visible">
	<span>sliderValues: {sliderValues}</span><br />
	<span>drinkMass: {drinkMass}</span><br />
	<span>currentIngredients: {currentIngredients}</span><br />
	<span>color: {calculateColor(currentIngredients)} </span><br />
</div>
    */
</script>

<div class="grid grid-cols-3 bg-orange-200 gap-1">
	<div class="select-none">
		<span class="float-right font-body text-brown-900 text-2xl"> drink size </span>
	</div>
	<div>
		<input
			class="float-left rounded-xl overflow-hidden appearance-none bg-brown-600 w-96 drop-shadow-md"
			type="range"
			bind:value={drinkMass}
			min="5"
			max="240"
			step="5"
		/>
	</div>
	<div>
		<span class="float-right font-body text-brown-900 text-2xl">
			{drinkMass}g
		</span>
	</div>
</div>

<div class="grid grid-cols-3 bg-orange-200 gap-1">
	{#each ingredientNames as coffeeIngredient, idx}
		<div class="select-none">
			<span class="float-right font-body text-brown-900 text-2xl select-none">
				{coffeeIngredient.name}
			</span>
		</div>
		<div class="select-none">
			<input
				class="ingredient float-left rounded-xl overflow-hidden appearance-none bg-brown-800 w-80 drop-shadow-md"
				type="range"
				bind:value={sliderValues[idx]}
				min="0"
				max="100"
			/>
		</div>
		<div class="select-none">
			<span class="float-right font-body text-brown-900 text-2xl select-none">
				{Math.round(currentIngredients[idx])}g
			</span>
		</div>
	{/each}
</div>

<div class="grid place-items-center gap-5">
	<CoffeeCup color={calculateColor(currentIngredients)} size={drinkMass} />
	<span class="content-center font-body text-6xl text-brown-500">
		{#if closestDrink.distance < threshold}
			{closestDrink.name}
		{:else}
			a hot drink
		{/if}
	</span>
	<div class="grid grid-cols-4 gap-3">
		{#each recipes as recipe}
			{#if recipe.display}
				<div
					class:active={recipe.name == closestDrink.name && closestDrink.distance < threshold}
					class="bg-brown-900 rounded-xl p-4 hover:bg-brown-700 drop-shadow-md"
					on:click={() => {
						setIngredientsFromRecipe(recipe);
					}}
					on:keydown={() => {
						setIngredientsFromRecipe(recipe);
					}}
				>
					<span class="font-body text-xl text-brown-300 cursor-default">{recipe.name}</span>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.active {
		background: #763331;
	}
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
