<script lang="ts">
	import CocktailDetail from '$lib/components/CocktailDetail.svelte';
	import CocktailOverviewCard from '$lib/components/CocktailOverviewCard.svelte';
	import FilterIcon from '$lib/components/icons/FilterIcon.svelte';
	import { requestCocktailByFirstLetter } from '$lib/network/cocktailRequests';
	import type { Cocktail } from '$lib/types/cocktailType';
	import { onMount } from 'svelte';

	const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
	let currentLetter = 0;

	let cocktails: Cocktail[] | undefined = $state();
	let body: HTMLElement | undefined = $state();
	let bodyTop: number = $state(0);
	let bodyLeft: number = $state(0);
	let displayFilter = $state(false);
	let toDisplayCocktail: number | null = $state(null);
	$inspect(bodyTop).with(console.log);
	function onFilterClick() {
		displayFilter = !displayFilter;
	}

	async function onscroll() {
		if (!body) return;
		let zw = body.scrollTop - (body.scrollHeight - body.offsetHeight);
		if (zw < 1 && zw > -1) {
			if (++currentLetter >= 26 || !cocktails) return;
			let newCoc = await requestCocktailByFirstLetter(alphabet[currentLetter]);
			if (!newCoc) return;
			cocktails = [...cocktails, ...newCoc];
		}
	}
	async function setup() {
		if (!body) return;
		console.log(body.getBoundingClientRect().top);
		bodyTop = body.getBoundingClientRect().top;
		bodyLeft = body.getBoundingClientRect().left;
		cocktails = await requestCocktailByFirstLetter(alphabet[currentLetter]);
	}
	onMount(() => {
		setup();
	});
</script>

<div id="topBody" class="h-full w-full overflow-auto">
	{#if toDisplayCocktail == null}
		<div class={displayFilter ? 'h-[20%]' : ''}></div>
		<div
			id="body"
			class="flex {!displayFilter ? 'h-full' : ''} w-full flex-wrap justify-center overflow-auto"
			bind:this={body}
			{onscroll}
		>
			<button
				onclick={onFilterClick}
				class="absolute z-99 flex h-12 w-12 items-center justify-center rounded-full
		bg-[var(--ctp-overlay0)] shadow-lg transition-colors duration-200 hover:bg-[var(--accent)]"
				style="top: {bodyTop}; left:{bodyLeft};"
			>
				<FilterIcon onclick={() => console.log('filter')} />
			</button>
			{#if cocktails}
				{#each cocktails as cocktail, i}
					<CocktailOverviewCard
						width="24%"
						height="30%"
						{cocktail}
						onclick={() => {
							toDisplayCocktail = i;
							console.log('Selected: ' + i);
						}}
					/>
				{/each}
			{/if}
		</div>
	{:else}
		<CocktailDetail
			cocktail={cocktails![toDisplayCocktail]}
			onClose={() => {
				toDisplayCocktail = null;
			}}
		/>
	{/if}
</div>

<style>
	#body {
		overflow: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
</style>
