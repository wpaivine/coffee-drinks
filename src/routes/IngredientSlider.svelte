<script lang="ts">
	export let name: string;
	export let currentValue: number;
	export let currentMass: number;
	export let min = '0';
	export let max = '100';
	export let step = '1';
	export let styleClass = 'bg-brown-800';
</script>

<div class="select-none">
	<span class="float-right font-body text-brown-900 text-xl select-none px-1">
		{name}
	</span>
</div>
<div class="select-none">
	<input
		class="{styleClass} float-right rounded-xl overflow-hidden appearance-none w-full drop-shadow-md"
		type="range"
		bind:value={currentValue}
		{min}
		{max}
		{step}
	/>
</div>
<div class="select-none">
	<span class="float-left px-4 font-body text-brown-900 text-l select-none">
		{Math.round(currentMass)}g
	</span>
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
