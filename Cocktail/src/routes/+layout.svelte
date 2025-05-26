<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Setting from '$lib/components/Setting.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import {
		accentColorIndex,
		colorFlavorIndex,
		colorFlavors,
		favorites,
		load,
		save
	} from '$lib/general/store';
	import { updateColorScheme } from '$lib/general/color';
	import { goto } from '$app/navigation';

	let { children } = $props();
	let displaySettings = $state(false);
	onMount(() => {
		load();
		colorFlavorIndex.subscribe((_) => save());
		accentColorIndex.subscribe((_) => save());
		favorites.subscribe((_) => save());
		colorFlavorIndex.subscribe((v) => updateColorScheme(colorFlavors[v].id));
	});
</script>

<div class="h-full w-full bg-[var(--ctp-base)] text-[var(--ctp-text)]">
	<header class="h-[15%] w-full">
		<Header
			settingClick={() => (displaySettings = !displaySettings)}
			searchClick={() => goto('/search')}
			favoriteClick={() => goto('/favorites')}
		/>
	</header>
	<main class="h-[77%] w-full">
		{#if displaySettings}
			<div class="absolute top-[20%] left-[20%] z-50 h-[60%] w-[60%] bg-[var(--ctp-surface0)]">
				<Setting saveClick={() => (displaySettings = false)} />
			</div>
		{/if}
		{@render children()}
	</main>
	<footer class="h-[8%] w-full text-[var(--ctp-text)]"><Footer /></footer>
</div>
