<script lang="ts">
	import type { Cocktail } from '$lib/types/cocktailType';
	import { onMount } from 'svelte';
	import FavouriteIcon from './icons/FavouriteIcon.svelte';
	import { favorites } from '$lib/general/store';
	import { get } from 'svelte/store';

	interface PropType {
		width: string | undefined;
		height: string | undefined;
		cocktail: Cocktail | undefined;
		onclick: () => void;
	}
	let { width = '30%', height = '80%', cocktail, onclick }: PropType = $props();

	let drinkThumb: string = $state('');
	let drink: string = $state('');
	let isFavorite: boolean = $state(false);
	let parent: HTMLElement | undefined = $state();
	let pixelWidthOfParent: number = $state(0);
	let pixelHeightOfParent: number = $state(0);
	onMount(() => {
		if (!cocktail) return;
		drinkThumb = cocktail.drinkThumb;
		drink = cocktail.drink;
		isFavorite = get(favorites).filter((x) => x == cocktail.idDrink).length > 0;
		if (!parent) return;
		pixelHeightOfParent = parent.clientHeight;
		pixelWidthOfParent = parent.clientWidth;
	});
	function onFavoriteClick(e: Event) {
		e.stopPropagation();
		if (!cocktail) return;
		if (isFavorite) favorites.update((x) => x.filter((y) => y != cocktail.idDrink));
		else favorites.update((x) => [...x, cocktail.idDrink]);
		isFavorite = !isFavorite;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="relative m-1 flex shrink-1 grow-0 flex-col items-center justify-around rounded-lg bg-[var(--ctp-surface0)] p-1"
	style="width: {width}; height:{height};"
	bind:this={parent}
	{onclick}
>
	<!-- svelte-ignore a11y_img_redundant_alt -->
	<img
		src={drinkThumb || ''}
		alt="Drink Image"
		style="max-width: auto;max-height:{pixelHeightOfParent - pixelHeightOfParent / 4}px;"
	/>
	<h1 class="text-[1.5em] font-bold">{drink}</h1>

	<!-- Add this button with absolute positioning -->
	<button
		onclick={(e) => onFavoriteClick(e)}
		class="absolute right-2 bottom-2 rounded-full bg-[var(--ctp-overlay0)] p-2 text-[var(--ctp-text)] transition-colors hover:bg-[var(--ctp-blue)]/80"
	>
		<FavouriteIcon
			{isFavorite}
			onclick={() => {
				return;
			}}
		/>
	</button>
</div>
