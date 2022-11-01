<script lang="ts">
	import CoffeeCup from './CoffeeCup.svelte';
	import {
		calculateClosestDrink,
		calculateColor,
		ingredientNames,
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

	$: if (sliderValues.every((v) => v == 0)) {
		sliderValues[0] = 1;
	}

	function setIngredientsFromRecipe(recipe: Recipe) {
		drinkMass = recipe.ingredients.reduce((a, b) => a + b);

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

	<div class="grid place-items-center gap-5 py-10">
		<CoffeeCup color={calculateColor(currentIngredients)} size={drinkMass} />
		<span class="content-center font-body text-4xl text-brown-500">
			{#if closestDrink.distance < threshold}
				{closestDrink.name}
			{:else}
				a hot drink
			{/if}
		</span>
		<div class="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3">
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
						<span class="font-body text-l text-brown-300 cursor-default select-none"
							>{recipe.name}</span
						>
					</div>
				{/if}
			{/each}
		</div>
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
