<script lang="ts">
	export let color = '#625241';
	export let size = 36;
	export const scale = 20;

	import { spring } from 'svelte/motion';

	const maxSize = 240;

	const maxSide = volumeToSize(maxSize);

	const fluidSize = spring(maxSide, { stiffness: 0.1, damping: 1 });

	$: fluidSize.set(volumeToSize(size));

	function volumeToSize(size: number) {
		return Math.pow(Math.min(size, maxSize) * scale, 1 / 3);
	}
</script>

<span> {color} {$fluidSize}</span>
<div
	class="cup flex items-end drop-shadow-xl border-brown-900 bg-brown-100 border-b-8 border-l-8 border-r-8 justify-center space-x-8"
	style="height: {maxSide * 1.1}rem"
>
	<div
		style="background-color: {color}; width: {maxSide}rem; height: {($fluidSize * $fluidSize) /
			maxSide}rem"
		class="fluid"
	/>
</div>

<style>
	.fluid {
		border-bottom-left-radius: 3rem;
		border-bottom-right-radius: 3rem;
	}
	.cup {
		border-bottom-left-radius: 3.6rem;
		border-bottom-right-radius: 3.6rem;
	}
</style>
