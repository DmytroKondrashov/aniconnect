<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { AnimePageData } from '$lib/types/page-data';
	import type { Anime } from '$lib/types/anime';

	interface Props extends Record<string, unknown> {
		data: AnimePageData;
		children: Snippet;
	}

	let { data, children }: Props = $props();

	const permittedFields = [
		'poster',
		'name',
		'russian',
		'english',
		'japanese',
		'episodes',
		'studios'
	] as const;

	const fieldNames: Record<(typeof permittedFields)[number], string> = {
		poster: '',
		name: 'Name',
		russian: 'Russian',
		english: 'English',
		japanese: 'Japanese',
		episodes: 'Episodes',
		studios: 'Studios'
	};
</script>

<ul>
	{#if data.loading}
		<span>Loading...</span>
	{:else if data.anime}
		<div class="flex flex-col md:flex-row gap-6">
			<div class="flex-shrink-0 md:w-64 w-full">
				{#each permittedFields as key}
					{#if key === 'poster'}
						<figure class="mb-4">
							<img src={data.anime[key].mainUrl} alt="Anime poster" class="w-full rounded-lg shadow-md" />
						</figure>
					{:else if key === 'studios'}
						{@const studios = data.anime[key] as Anime['studios']}
						<span class="mb-2 block text-sm"
							><b class="capitalize">{fieldNames[key]}:</b>
							{studios.map(({ name }) => name).join(', ')}</span
						>
					{:else}
						<div class="flex flex-col">
							<span class="mb-2 block text-sm"
								><b class="capitalize">{fieldNames[key]}:</b> {data.anime[key]}</span
							>
						</div>
					{/if}
				{/each}
			</div>
			<div class="flex-1 min-w-0">
				{@render children?.()}
			</div>
		</div>
	{:else}
		<span>Anime not found</span>
	{/if}
</ul>

{#if data.errors.length > 0}
	<ul>
		{#each data.errors as error}
			<li>{error}</li>
		{/each}
	</ul>
{/if}
