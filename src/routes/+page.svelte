<script lang="ts">
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import type { Industry } from '$lib/models/Industry';
	import type { Service } from '$lib/models/Service';

	//create a static list because there is no definition on how should I calculate the most populars from the api
	const MOST_POPULARS = [
		'Accounting',
		'Appliance Installation',
		'Architectural services',
		'Barber',
		'Bricklayer',
		'Eletrician',
		'Event Planning',
		'Excavation Constractor',
		'Exterior Cleaner',
		'Car Detailing',
		'Carpenter',
		'BBQ Cleaning',
		'Flooring Contractor',
		'Food Services',
		'Foundation Contractor',
		'Garage Door Contractor',
		'General Contractor'
	];

	// @ts-ignore
	export let data: { industries: Industry[] } = [];

	let dropdown: Dropdown<Industry>;
	let industries: Industry[] = [];
	let selectedIndustry: { origin: 'dropdown' | 'tag'; value: Industry } | undefined;

	resetIndustries();

	function clearSelectedIndustry() {
		selectedIndustry = undefined;
		dropdown.clear();
	}

	function getIndustryFromName(name: string) {
		return data.industries.find((o) => o.name === name)!;
	}

	function onDropdownSearch(e: CustomEvent<string>) {
		const text = e.detail?.toLocaleLowerCase();

		//I could have used .filter and .map but they would clone the object and I don't see much benefit on using it in this case
		if (text) {
			industries = [];

			const compareSynonyms = (a: string) => a.toLocaleLowerCase().includes(text);
			const compareServiceName = (a: Service) => a.name.toLocaleLowerCase().includes(text);

			for (const industry of data.industries) {
				if (
					industry.name.toLocaleLowerCase().includes(text) ||
					industry.synonyms.find(compareSynonyms) ||
					industry.services.find(compareServiceName)
				) {
					industries.push(industry);
				}
			}
			industries = industries;
		} else {
			clearSelectedIndustry();
			resetIndustries();
		}
	}

	function onDropdownSelect(e: CustomEvent<Industry>) {
		selectedIndustry = { origin: 'dropdown', value: e.detail };
		resetIndustries();
	}

	function onTagSelect(e: CustomEvent<string>) {
		dropdown.clear();

		if (selectedIndustry?.value?.name === e.detail) {
			clearSelectedIndustry();
		} else {
			selectedIndustry = { origin: 'tag', value: getIndustryFromName(e.detail) };
		}
		resetIndustries();
	}

	function resetIndustries() {
		industries = data.industries;
	}
</script>

<Dropdown
	bind:this={dropdown}
	placeholder="Search for your industry"
	options={industries}
	selected={selectedIndustry?.value}
	style="margin-top: 38px;"
	on:search={onDropdownSearch}
	on:select={onDropdownSelect}
/>

<h4 style="margin-top: 40px;">Or select from the most popular:</h4>

<div id="tags">
	<!-- I should have created a component just to handle the tag list but I need to sleep -->
	{#each MOST_POPULARS as tag (tag)}
		<Tag
			selected={selectedIndustry &&
				selectedIndustry.origin === 'tag' &&
				selectedIndustry.value.name === tag}
			on:select={onTagSelect}>{tag}</Tag
		>
	{/each}
</div>

<div id="buttons">
	<button class="button" id="button-back" on:click={clearSelectedIndustry}>
		<img src="/images/chevron-left.png" alt="Back button" />
		Back
	</button>
	<button class="button" id="button-continue" disabled={!selectedIndustry}>Continue</button>
</div>

<style>
	#button-back {
		align-items: center;
		display: flex;
		gap: 8px;
		justify-content: space-between;
		width: 80px;
	}

	#button-continue {
		background-color: var(--bg-disabled);
		width: 200px;
	}

	#button-continue:not(:disabled) {
		background-color: var(--primary);
		color: white;
	}

	#buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 174px;
	}

	#tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 20px;
	}

	.button {
		border: 1px solid var(--component-border);
		border-radius: 4px;
		font-size: 14px;
		font-weight: bold;
		line-height: 20px;
		padding: 10px 12px 12px 8px;
	}
</style>
