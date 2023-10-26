<script lang="ts">
	import { fade } from 'svelte/transition';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	type T = $$Generic<{ name: string }>;

	export let options: T[] = [];
	export let placeholder: string;

	let isOpen = false;
	let value = '';
	let wrapper: HTMLDivElement;

	function checkClickInsideComponent(e: MouseEvent) {
		isOpen = wrapper.contains(e.target as HTMLElement);
	}

	function search() {
		dispatch('search', value);
	}

	function select(e: MouseEvent, option: T) {
		e.preventDefault();
		e.stopImmediatePropagation();
		value = option.name;
		isOpen = false;
		dispatch('select', option);
	}

	export function clear() {
		value = '';
	}
</script>

<svelte:window on:click={checkClickInsideComponent} />

<div bind:this={wrapper} class="dropdown-wrapper" {...$$restProps}>
	<img class="icon search-icon" src="/images/search-icon.png" alt="Search icon" />
	<input type="search" bind:value {placeholder} class:focus={isOpen} on:input={search} />
	<button class="chevron-down-icon icon" on:click={() => (isOpen = !isOpen)} />

	{#if isOpen}
		<ul class="dropdown-body" transition:fade={{ duration: 150 }}>
			{#each options as option (option)}
				<li><button on:click={(e) => select(e, option)}>{option.name}</button></li>
			{:else}
				<li class="empty">
					<img
						src="/images/search-icon-empty-dropdown.png"
						height="48"
						width="48"
						alt="Search icon"
					/>
					<p>Oops... We can’t find similar service in our list. Try another keyword to search</p>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	input {
		border: 1px solid #d8dbde;
		border-radius: 4px;
		font-size: 16px;
		line-height: 21px;
		padding: 12px 48px 10px 48px;
		width: 100%;
	}

	input::placeholder {
		color: #8d939a;
	}

	input:focus {
		border: none;
		outline-color: var(--primary);
		outline-style: solid;
		outline-width: thin;
	}

	li {
		list-style: none;
	}

	li button {
		border: none;
		padding: 10px 12px 10px 12px;
		text-align: left;
		width: 100%;
	}

	li:hover {
		background-color: #f9fafa;
	}

	.focus {
		border: 1px solid var(--primary);
	}

	.chevron-down-icon {
		border: none;
		background: url(/images/chevron-down.png) no-repeat;
		font-size: 32px;
		position: absolute;
		right: 17px;
	}

	.dropdown-body {
		background-color: #fff;
		border: 1px solid var(--component-border);
		border-radius: 4px;
		box-shadow: -15px 15px 15px 0 #f0f0f0;
		max-height: 258px;
		overflow-x: hidden;
		overflow-y: auto;
		padding: 4px 12px 4px 8px;
		position: absolute;
		top: 40px;
		width: calc(100% - 20px);
		z-index: 10;
	}

	.dropdown-wrapper {
		align-items: center;
		display: flex;
		position: relative;
	}

	.dropdown-body::-webkit-scrollbar-button {
		height: 0;
		width: 0;
	}

	.empty {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: 20px;
		height: 196px;
		justify-content: center;
	}

	.empty p {
		font-size: 16px;
		line-height: 24px;
		text-align: center;
		width: 460px;
	}

	.icon {
		height: 22px;
		width: 22px;
	}

	.search-icon {
		position: absolute;
		left: 14px;
	}
</style>
