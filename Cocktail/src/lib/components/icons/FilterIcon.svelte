<script>
	let { onclick } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	height="24px"
	viewBox="0 -960 960 960"
	width="24px"
	{onclick}
	class="fill-[var(--accent)] hover:grayscale"
>
	<path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
</svg>
