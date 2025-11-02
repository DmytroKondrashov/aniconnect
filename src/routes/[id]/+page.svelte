<script lang="ts">
	import FullScreenshot from '$lib/components/FullScreenshot.svelte';
	import FullVideo from '$lib/components/FullVideo.svelte';
	import type { Anime } from '$lib/types/anime';
	import type { AnimePageData } from '$lib/types/page-data';

	let { data }: { data: AnimePageData } = $props();

	let visibleVideo = $state<string | null>(null);
	let visibleScreenshot = $state<string | null>(null);
	const permittedFieldsList = ['name', 'genres', 'descriptionHtml', 'screenshots', 'videos'] as const satisfies readonly (keyof Anime)[];

	$inspect(visibleScreenshot);

	const fieldNames: Record<(typeof permittedFieldsList)[number], string> = {
		name: '',
		genres: '',
		videos: 'Videos',
		screenshots: 'Screenshots',
		descriptionHtml: ''
	};

	function handlePrevScreenshot(screenshots: Anime['screenshots']) {
		if (!visibleScreenshot) return;
		const currentIndex = screenshots.findIndex((s) => s.id === visibleScreenshot);
		if (currentIndex > 0) {
			visibleScreenshot = screenshots[currentIndex - 1].id;
		}
	}

	function handleNextScreenshot(screenshots: Anime['screenshots']) {
		if (!visibleScreenshot) return;
		const currentIndex = screenshots.findIndex((s) => s.id === visibleScreenshot);
		if (currentIndex < screenshots.length - 1) {
			visibleScreenshot = screenshots[currentIndex + 1].id;
		}
	}
</script>

{#snippet valueFormatter(key: string, value: unknown)}
	{#if key === 'name'}
		<span class="text-2xl font-bold text-gray-900">{value}</span>
	{:else if key === 'genres'}
		{@const genres = value as Anime['genres']}
		{#each genres as { id, name, russian } (id)}
			<span class="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full mr-2 mb-1"
				>{russian}</span
			>
		{/each}
	{:else if key === 'videos'}
		{@const videos = value as Anime['videos']}
		<div class="flex flex-nowrap overflow-x-auto gap-2 pb-2">
			<!-- TODO: show imageUrl thumbnail and "full" video on click -->
			{#each videos as { id, playerUrl, imageUrl } (id)}
				{#if playerUrl.includes('youtube.com')}
					<!-- <iframe class="mr-2" src={playerUrl.replace('watch?v=', 'embed/')}  
					frameborder="0" allowfullscreen loading="lazy" title="Anime Video"></iframe> -->
					<button
						type="button"
						class="flex-shrink-0 p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
						onclick={() => (visibleVideo = playerUrl)}
					>
						<img
							class="w-40 h-24 object-cover rounded"
							src={imageUrl}
							loading="lazy"
							alt="Anime Video Preview"
						/>
					</button>
				{/if}
			{/each}
		</div>
	{:else if key === 'screenshots'}
		{@const screenshots = value as Anime['screenshots']}
		<div class="flex flex-nowrap overflow-x-auto gap-2 pb-2">
			{#each screenshots as { id, x332Url, originalUrl } (id)}
				<button
					type="button"
					class="flex-shrink-0 p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
					onclick={() => (visibleScreenshot = originalUrl)}
				>
					<img
						class="w-40 h-24 object-cover rounded"
						src={x332Url}
						loading="lazy"
						alt="Anime Screenshot"
					/>
				</button>
			{/each}
		</div>
	{:else if key === 'descriptionHtml'}
		<span class="text-gray-700 leading-relaxed">{@html value}</span>
	{:else}
		<span class="text-gray-700">{value}</span>
	{/if}
{/snippet}

<dl class="space-y-4">
	{#each permittedFieldsList as key}
		{#if permittedFieldsList.includes(key)}
			<dt class="text-lg font-semibold text-gray-900 capitalize border-b border-gray-200 pb-1">
				{fieldNames[key]}
			</dt>
			<dd class="mt-2">{@render valueFormatter(key, data.anime[key as keyof Anime])}</dd>
		{/if}
	{/each}
</dl>

<FullVideo bind:src={visibleVideo} alt="Anime Video" />
<FullScreenshot bind:src={visibleScreenshot} alt="Anime Screenshot" />
