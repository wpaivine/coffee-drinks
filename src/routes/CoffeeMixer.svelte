<script lang="ts">
	import CoffeeCup from './CoffeeCup.svelte';
	import {
		calculateClosestDrink,
		calculateColor,
		ingredientNames,
		makeIngredients,
		makeRecipe,
		normalizeIngredients,
		recipeDistance,
		recipes,
		type Ingredients,
		type Recipe
	} from './types';

	let drinkMass = 15;

	let drinkName = 'espresso';

	let currentIngredients = makeIngredients({});

	$: ingredientSum = currentIngredients.reduce((acc, cur) => acc + cur);

	$: ingredientSum, setMinIngredient();

	$: drinkName = calculateClosestDrink(currentIngredients, drinkMass / ingredientSum).name;

	function setMinIngredient() {
		if (ingredientSum == 0) {
			currentIngredients[0] = 1;
			ingredientSum = 1;
		}
	}

	function setIngredientsFromRecipe(recipe: Recipe) {
		drinkMass = recipe.ingredients.reduce((a, b) => a + b);
		currentIngredients = normalizeIngredients(recipe.ingredients);
	}
</script>

<div style="visibility: hidden">
	<span>ingredientSum: {ingredientSum}</span>
	<span>drinkMass: {drinkMass}</span>
	<span>currentIngredients: {currentIngredients}</span>
	<span>color: {calculateColor(currentIngredients)} </span>
</div>

<div class="grid grid-cols-3 bg-orange-200 gap-1">
	<div>
		<span class="float-right font-body text-brown-900 text-2xl"> drink size </span>
	</div>
	<div>
		<input
			class="float-left rounded-xl overflow-hidden appearance-none bg-brown-600 w-96"
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
		<div>
			<span class="float-right font-body text-brown-900 text-2xl">
				{coffeeIngredient.name}
			</span>
		</div>
		<div>
			<input
				class="ingredient float-left rounded-xl overflow-hidden appearance-none bg-brown-800 w-80"
				type="range"
				bind:value={currentIngredients[idx]}
				min="0"
				max="100"
			/>
		</div>
		<div>
			<span class="float-right font-body text-brown-900 text-2xl">
				{Math.round((currentIngredients[idx] / ingredientSum) * drinkMass)}g
			</span>
		</div>
	{/each}
</div>

<div class="grid place-items-center gap-5">
	<CoffeeCup color={calculateColor(currentIngredients)} />
	<span class="content-center font-body text-6xl text-brown-500">
		{drinkName}
	</span>
	<div class="grid grid-cols-4 gap-3">
		{#each recipes as recipe}
			<div
				class:active={recipe.name == drinkName}
				class="bg-brown-900 rounded-xl p-4 hover:bg-brown-700"
				on:click={() => {
					setIngredientsFromRecipe(recipe);
				}}
			>
				<span class="font-body text-xl text-brown-300 cursor-default">{recipe.name}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.active {
		@apply bg-amber-900;
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
