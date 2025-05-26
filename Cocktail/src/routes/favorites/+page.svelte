<script lang="ts">
	import CocktailDetail from '$lib/components/CocktailDetail.svelte';
	import CocktailOverviewCard from '$lib/components/CocktailOverviewCard.svelte';
	import { requestFavorites } from '$lib/network/cocktailRequests';
	import type { Cocktail } from '$lib/types/cocktailType';
	import { onMount } from 'svelte';

	let favoriteCocktails: Cocktail[] | undefined = $state();
	let toDisplayCocktail: number | null = $state(null);

	async function setup() {
		favoriteCocktails = await requestFavorites();
		if (!favoriteCocktails) return;
		favoriteCocktails = favoriteCocktails.sort((a, b) => (a.drink > b.drink ? 1 : -1));
	}

	onMount(() => setup());
</script>

<div id="body" class="flex h-full w-full flex-wrap justify-center overflow-auto">
	{#if favoriteCocktails}
		{#if toDisplayCocktail == null}
			{#each favoriteCocktails as fav, i}
				<CocktailOverviewCard
					width="24%"
					height="30%"
					cocktail={fav}
					onclick={() => {
						toDisplayCocktail = i;
					}}
				/>
			{/each}
		{:else}
			<CocktailDetail
				cocktail={favoriteCocktails![toDisplayCocktail]}
				onClose={() => {
					toDisplayCocktail = null;
				}}
			/>
		{/if}
	{/if}
</div>

<style>
	#body {
		overflow: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
</style>
