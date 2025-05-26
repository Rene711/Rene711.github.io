<script>
	import { updated } from '$app/state';
	import { setAccentColor } from '$lib/general/color';
	import {
		accentColorIndex,
		allColors,
		colorFlavorIndex,
		colorFlavors,
		favorites,
		resetSettings
	} from '$lib/general/store';
	import { get } from 'svelte/store';

	// @ts-nocheck

	let { saveClick = () => console.log('Save Settings') } = $props();
	let selectedFlavor = $state(get(colorFlavorIndex));
	let accentColor = $state(get(accentColorIndex));
	function settingSave() {
		colorFlavorIndex.set(selectedFlavor);
		accentColorIndex.set(accentColor);
		setAccentColor();
		saveClick();
	}
</script>

<div class="z-50 h-full w-full space-y-4 rounded-2xl p-6 text-[var(--ctp-text)] shadow-lg">
	<label for="flavor-select" class="block text-lg font-semibold text-[var(--ctp-subtext1)]">
		Select Flavor
	</label>
	<select
		id="flavor-select"
		class="w-full rounded-xl border border-[var(--ctp-surface2)] bg-[var(--ctp-surface0)] p-3 text-[var(--ctp-text)] transition focus:ring-2 focus:ring-[var(--ctp-blue)] focus:outline-none"
		bind:value={selectedFlavor}
	>
		{#each colorFlavors as flavor, i}
			<option value={i}>{flavor.name}</option>
		{/each}
	</select>

	<label for="accent-select" class="block text-lg font-semibold text-[var(--ctp-subtext1)]">
		Select Accent Color
	</label>
	<select
		id="accent-select"
		class="w-full rounded-xl border border-[var(--ctp-surface2)] bg-[var(--ctp-surface0)] p-3 text-[var(--ctp-text)] transition focus:ring-2 focus:ring-[var(--ctp-blue)] focus:outline-none"
		bind:value={accentColor}
	>
		{#each allColors as color, i}
			<option value={i}>{color.name}</option>
		{/each}
	</select>

	<button
		onclick={() => settingSave()}
		class="w-full rounded-xl bg-[var(--ctp-overlay0)] px-6 py-3 font-semibold text-[var(--ctp-green)] transition hover:bg-[var(--ctp-overlay1)]"
	>
		Save Settings
	</button>
	<button
		onclick={() => favorites.update((_) => [])}
		class="w-full rounded-xl bg-[var(--ctp-overlay0)] px-6 py-3 font-semibold text-[var(--ctp-yellow)] transition hover:bg-[var(--ctp-overlay1)]"
	>
		Clear Favorites
	</button>
	<button
		onclick={() => resetSettings()}
		class="w-full rounded-xl bg-[var(--ctp-overlay0)] px-6 py-3 font-semibold text-[var(--ctp-red)] transition hover:bg-[var(--ctp-overlay1)]"
	>
		Reset Settings
	</button>
</div>
