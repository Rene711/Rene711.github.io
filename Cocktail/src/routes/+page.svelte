<script lang="ts">
	import type { Cocktail } from '$lib/types/cocktailType';
	import CocktailOverviewCard from '$lib/components/CocktailOverviewCard.svelte';
	import { accentColorIndex, colorFlavorIndex, favorites, load, save } from '$lib/general/store';
	import { requestRandomCocktail } from '$lib/network/cocktailRequests';
	import { onMount } from 'svelte';
	import CocktailDetail from '$lib/components/CocktailDetail.svelte';

	let randomDrink: Cocktail | undefined = $state();
	let displayDetails: boolean = $state(false);

	$inspect(randomDrink).with(console.log);
	async function setUp() {
		randomDrink = await requestRandomCocktail();
	}
	onMount(() => {
		setUp();
	});
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	{#if randomDrink}
		{#if displayDetails}
			<CocktailDetail
				cocktail={randomDrink}
				onClose={() => {
					displayDetails = false;
				}}
			/>
		{:else}
			<h1 class="mb-2 text-[2em] font-bold">Drink Suggestion:</h1>
			<CocktailOverviewCard
				width="30%"
				height="80%"
				cocktail={randomDrink}
				onclick={() => (displayDetails = true)}
			/>
		{/if}
	{/if}
</div>
