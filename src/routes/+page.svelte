<script lang="ts">
	import urql from '$lib/urql';
	import { setContextClient, gql } from '@urql/svelte';
	import { getAnimeList } from '$lib/queries/getAnimeList';
	import AnimeCard from '$lib/components/AnimeCard.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { page, limit, search } from '$lib/stores';
	import type Anime from '$lib/interfaces/Anime';
	setContextClient(urql);

	let animes = $state<Anime[]>([]);
	let errors = $state<string[]>([]);
	let loading = $state(false);
	let searchQuery = $state('');

	function searchAnime(limit: number, page: number, search: string) {
		loading = true;
		urql
			.query(getAnimeList, { limit, page, search })
			.toPromise()
			.then(({ data, error }) => {
				if (data?.animes) {
					animes = data.animes;
				}

				if (error?.message) {
					errors.push(error.message);
				}
			})
			.catch((error) => errors.push(error.toString()))
			.finally(() => (loading = false));
	}

	$effect(() => {
		searchAnime($limit, $page, $search);
		if ($search !== '') {
			searchQuery = $search;
		}
	});
</script>

<div class="mb-6 flex justify-center px-4 sm:px-0">
	<div class="w-full max-w-xl">
		<div class="flex flex-col sm:flex-row gap-2">
			<input
				class="flex-1 w-full rounded-md sm:rounded-l-md sm:rounded-r-none border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
				type="text"
				placeholder="Find your anime"
				bind:value={searchQuery}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						$search = searchQuery;
					}
				}}
			/>
			<button
				class="rounded-md sm:rounded-l-none sm:rounded-r-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors text-base"
				onclick={() => ($search = searchQuery)}
			>
				Search
			</button>
		</div>
	</div>
</div>
<ul>
	{#if loading}
		<span>Loading...</span>
	{:else if animes}
		<section>
			<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
				{#each animes as anime}
					<AnimeCard class="" {anime} />
				{:else}
					<span class="col-span-2 sm:col-span-full">No animes found</span>
				{/each}
			</div>
		</section>
		<Pagination bind:page={$page} bind:limit={$limit} />
	{:else}
		<span>No animes found</span>
	{/if}
</ul>

{#if errors.length > 0}
	<ul>
		{#each errors as error}
			<li>{error}</li>
		{/each}
	</ul>
{/if}
