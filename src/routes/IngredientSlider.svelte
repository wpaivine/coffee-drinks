<script>
	/**
	 * @type {{ name: string; }}
	 */
	export let ingredient;
	let sliderValue = 0;
</script>

<label>
	<span>
		{ingredient.name}
	</span>
	<input type="range" bind:value={sliderValue} min="0" max="200" />
</label>

<style>
	span {
		font-family: 'Comfortaa';
		font-size: 22px;
	}
</style>
