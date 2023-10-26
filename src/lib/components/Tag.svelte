<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let selected = false;

	function select(e: MouseEvent) {
		dispatch('select', (e.target as HTMLButtonElement).innerText);
	}
</script>

<button class:active={selected} on:click={select} {...$$restProps}>
	<slot />
</button>

<style>
	button {
		border: 1px solid var(--component-border);
		border-radius: 4px;
		color: #000;
		padding: 6px 15px;
	}

	button.active,
	button:hover {
		background-color: var(--bg-primary);
		border: 1px solid var(--primary);
		color: var(--primary);
	}
</style>
