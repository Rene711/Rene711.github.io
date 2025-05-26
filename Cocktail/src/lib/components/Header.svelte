<script>
	import FavouriteIcon from './icons/FavouriteIcon.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';
	import SettingIcon from './icons/SettingIcon.svelte';
	let {
		settingClick = () => console.log('Setting opened'),
		favoriteClick = () => console.log('Favorite opened'),
		searchClick = () => console.log('Search opened')
	} = $props();
</script>

<div class="flex h-full w-full bg-[var(--ctp-crust)] pl-2">
	<div class="flex flex-grow items-center">
		<a href="/"
			><h1 class="ml-[1%] text-[3em] font-bold text-[var(--accent)] select-none">Cocktails</h1></a
		>
	</div>
	<div class="mr-[2%] flex flex-grow items-center justify-end gap-2">
		<SettingIcon onclick={settingClick} />
		<FavouriteIcon onclick={favoriteClick} />
		<SearchIcon onclick={searchClick} />
	</div>
</div>
