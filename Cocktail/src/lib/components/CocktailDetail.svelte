<script lang="ts">
	import { favorites } from '$lib/general/store';
	import type { Cocktail } from '$lib/types/cocktailType';
	import { onMount } from 'svelte';
	import FavouriteIcon from './icons/FavouriteIcon.svelte';
	import { get } from 'svelte/store';

	interface PropType {
		cocktail: Cocktail;
		onClose: () => void;
	}
	let { cocktail, onClose }: PropType = $props();
	let isFavorite: boolean = $state(false);
	let bindLanguage = $state(0);
	function onFavoriteClick() {
		if (!cocktail) return;
		if (isFavorite) favorites.update((x) => x.filter((y) => y != cocktail.idDrink));
		else favorites.update((x) => [...x, cocktail.idDrink]);
		isFavorite = !isFavorite;
	}
	onMount(() => {
		isFavorite = get(favorites).filter((x) => x == cocktail.idDrink).length > 0;
	});
</script>

<div class="flex h-full w-full flex-col items-center">
	<div
		id="line-1"
		class="mt-2 flex h-2/5 w-1/2 flex-row border-b border-solid border-[var(--ctp-text)] bg-[var(--ctp-surface0)]"
	>
		<!-- svelte-ignore a11y_img_redundant_alt -->
		<div id="imageContainer" class="flex h-full w-2/5 justify-center">
			<img
				src={cocktail.drinkThumb}
				alt="Here should be a picture of a drink"
				class="h-full w-auto"
			/>
		</div>

		<div
			id="details"
			class=" relative flex h-full w-3/5 flex-col border-l border-solid border-[var(--ctp-text)]"
		>
			<div id="line1">
				<span class="ml-3 w-1/2 font-bold">Name:</span>
				<span class="ml-1 w-1/2">
					{cocktail.drink}
					{cocktail.drinkAlternate ? ` (${cocktail.drinkAlternate})` : ''}
				</span>
			</div>
			<div id="line2">
				<span class="ml-3 w-1/2 font-bold">Tags:</span>
				<span class="ml-1 w-1/2">
					{cocktail.tags ? cocktail.tags : '-'}
				</span>
			</div>
			<div id="line3">
				<span class="ml-3 w-1/2 font-bold">Video:</span>
				{#if cocktail.video}
					<a class="ml-1 w-1/2 text-[var(--ctp-blue)]" target="_blank" href={cocktail.video}>Link</a
					>
				{:else}
					<span class="ml-1 w-1/2">-</span>
				{/if}
			</div>
			<div id="line4">
				<span class="ml-3 w-1/2 font-bold">Category:</span>
				<span class="ml-1 w-1/2">
					{cocktail.category ? cocktail.category : '-'}
				</span>
			</div>
			<div id="line5">
				<span class="ml-3 w-1/2 font-bold">IBA:</span>
				<span class="ml-1 w-1/2">
					{cocktail.IBA ? cocktail.IBA : '-'}
				</span>
			</div>
			<div id="line6">
				<span class="ml-3 w-1/2 font-bold">Alcoholic:</span>
				<span class="ml-1 w-1/2">
					{cocktail.alcoholic ? cocktail.alcoholic : '-'}
				</span>
			</div>
			<div id="line7">
				<span class="ml-3 w-1/2 font-bold">Glass:</span>
				<span class="ml-1 w-1/2">
					{cocktail.glass ? cocktail.glass : '-'}
				</span>
			</div>
			<div class="absolute top-2 right-2 flex flex-row items-center">
				<button
					onclick={onFavoriteClick}
					class="rounded-full bg-[var(--ctp-overlay0)] p-2 text-[var(--ctp-text)] transition-colors hover:bg-[var(--ctp-blue)]/80"
				>
					<FavouriteIcon
						{isFavorite}
						onclick={() => {
							return;
						}}
					/>
				</button>
				<button
					onclick={() => onClose()}
					class="ml-2 rounded-full bg-[var(--ctp-overlay0)] p-2 text-[var(--ctp-text)] transition-colors hover:bg-[var(--ctp-blue)]/80"
					>Close</button
				>
			</div>
		</div>
	</div>
	<div
		id="line-2"
		class=" relative flex h-3/5 w-1/2 flex-row overflow-auto bg-[var(--ctp-surface0)]"
	>
		<div class="flex h-full w-1/2 flex-col items-center p-1">
			<select
				name=""
				id=""
				bind:value={bindLanguage}
				class="h-10 bg-[var(--ctp-overlay0)] text-[var(--ctp-text)]"
			>
				{#each cocktail.instructions as instruction, i}
					<option value={i}>{instruction.language}</option>
				{/each}
			</select>
			<div class="m-2">{cocktail.instructions[bindLanguage].instruction}</div>
		</div>
		<div
			class=" flex h-full w-1/2 items-start justify-center overflow-auto border-l border-solid border-[var(--ctp-text)] p-5"
		>
			<table class="m-2 w-full border-collapse text-[var(--ctp-text)]">
				<thead>
					<tr class="bg-[var(--ctp-overlay0)] text-left">
						<th class="border-b border-[var(--ctp-text)] px-4 py-2">Ingredient</th>
						<th class="border-b border-[var(--ctp-text)] px-4 py-2">Measure</th>
					</tr>
				</thead>
				<tbody>
					{#each cocktail.ingredients as ingredient, i}
						<tr class={i % 2 === 0 ? 'bg-[var(--ctp-surface0)]' : 'bg-[var(--ctp-surface1)]'}>
							<td class="px-4 py-2">{ingredient.ingredient}</td>
							<td class="px-4 py-2">{ingredient.measure}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	div {
		overflow: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
</style>
