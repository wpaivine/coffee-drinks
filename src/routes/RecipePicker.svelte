<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { calculateColor } from './coffee';
	import CoffeeCup from './CoffeeCup.svelte';
	import { recipes } from './recipes';
	import type { Ingredients, Recipe } from './types';

	export let closestDrink: { name: string; distance: number };
	export let currentIngredients: Ingredients;
	export let drinkMass: number;
	export let threshold: number;

	let bonk = false;

	const dispatch = createEventDispatcher();

	const setIngredientsFromRecipe = (recipe: Recipe) => {
		const newMass = recipe.ingredients.reduce((a, b) => a + b);
		if (newMass == drinkMass) {
			bonk = true;
		}
		dispatch('message', { recipe: recipe, newMass: newMass });
	};
</script>

<div class="grid place-items-center gap-5 py-10">
	<CoffeeCup color={calculateColor(currentIngredients)} size={drinkMass} bind:bonk />
	<span class="content-center font-body text-4xl text-brown-500">
		{#if closestDrink.distance < threshold}
			{closestDrink.name}
		{:else}
			a hot drink
		{/if}
	</span>
	<div class="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-3 ">
		{#each recipes as recipe}
			{#if recipe.display}
				{@const selected = recipe.name == closestDrink.name && closestDrink.distance < threshold}
				<div
					class:bg-amber-900={selected}
					class:bg-brown-900={!selected}
					class="rounded-xl p-4 hover:bg-brown-700 drop-shadow-md"
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
