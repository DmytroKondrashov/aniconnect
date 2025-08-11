<script lang="ts">
	import FullScreenshot from '$lib/components/FullScreenshot.svelte';
	import FullVideo from '$lib/components/FullVideo.svelte';
	import type Anime from '$lib/interfaces/Anime';
	import { onMount } from 'svelte';
	import Player from '$lib/components/Player.svelte';
	import 'vidstack/bundle';

	let { data }: { data: { anime: Anime; loading: boolean; errors: string[] } } = $props();

	let visibleVideo = $state<string | null>(null);
	let visibleScreenshot = $state<string | null>(null);
	const permittedFieldsList = ['name', 'genres', 'descriptionHtml', 'screenshots', 'videos', ];
	let playerData = $state(undefined);

	onMount(() => {
		fetch(`https://api.anilibria.tv/v3/title/search?search=${data.anime.name}`)
			.then(res => res.json())
			.then(anilibriaAnime => {
				console.log(anilibriaAnime.list[0].id);
				if (anilibriaAnime.list.length > 0) {
					return fetch(`https://api.anilibria.tv/v3/title?id=${anilibriaAnime.list[0].id}`);
				}
			})
			.then(res => {
				console.log('==============')
				console.log(res)
				return res ? res.json() : null
			})
			.then(data => {
				if (data) {
					playerData = data.player;
				}
				console.log('==============')
				console.log(data)
			})
			.catch(error => console.error('Error fetching data:', error));
	});

	const fieldNames: Record<typeof permittedFieldsList[number], string> = {
		name: '',
		genres: '',
		studios: 'Studios',
		videos: 'Videos',
		screenshots: 'Screenshots',
		descriptionHtml: ''
	}

	function handlePrevScreenshot(screenshots: Anime['screenshots']) {
		if (!visibleScreenshot) return;
		const currentIndex = screenshots.findIndex(s => s.id === visibleScreenshot);
		if (currentIndex > 0) {
			visibleScreenshot = screenshots[currentIndex - 1].id;
		}
	}

	function handleNextScreenshot(screenshots: Anime['screenshots']) {
		if (!visibleScreenshot) return;
		const currentIndex = screenshots.findIndex(s => s.id === visibleScreenshot);
		if (currentIndex < screenshots.length - 1) {
			visibleScreenshot = screenshots[currentIndex + 1].id;
		}
	}
</script>

{#snippet valueFormatter(key: string, value: unknown)}
	{#if key === 'name'}
		<span class='title'>{value}</span>
	{:else if key === 'genres'}
		{@const genres = value as Anime['genres']}
		{#each genres as { id, name, russian } (id)}
			<span class="tag is-light mr-2">{russian}</span>
		{/each}
	{:else if key === 'videos'}
		{@const videos = value as Anime['videos']}
		<div class="is-flex is-flex-wrap-nowrap is-flex-direction-row" style="overflow-x: scroll;">
			<!-- TODO: show imageUrl thumbnail and "full" video on click -->
			{#each videos as { id, playerUrl, imageUrl } (id)}
				{#if playerUrl.includes('youtube.com')}
					<!-- <iframe class="mr-2" src={playerUrl.replace('watch?v=', 'embed/')} 
					frameborder="0" allowfullscreen loading="lazy" title="Anime Video"></iframe> -->
					<img class="mr-2" src={imageUrl} loading="lazy" alt="Anime Video Preview" onclick={() => visibleVideo = playerUrl} />
				{/if}
			{/each}
		</div>
	{:else if key === 'screenshots'}
		{@const screenshots = value as Anime['screenshots']}
		<div class="is-flex is-flex-wrap-nowrap is-flex-direction-row" style="overflow-x: scroll;">
			{#each screenshots as { id, x332Url, originalUrl } (id)}
				<img class="mr-2" src={x332Url} loading="lazy" alt="Anime Screenshot" onclick={() => visibleScreenshot = originalUrl}/>
			{/each}
		</div>
	{:else if key === 'descriptionHtml'}
		<span>{@html value}</span>
	{:else}
		<span>{value}</span>
	{/if}
{/snippet}

<dl>
	{#each permittedFieldsList as key}
		{#if permittedFieldsList.includes(key)}
			<dt class="mt-4 subtitle is-capitalized">
				{fieldNames[key]}
			</dt>
			<dd>{@render valueFormatter(key, data.anime[key as keyof Anime])}</dd>
		{/if}
	{/each}
</dl>

{#if playerData !== undefined}
  <Player playerData={playerData} />
{/if}

<media-player title="Sprite Fight" src="https://files.vidstack.io/sprite-fight/720p.mp4">
  <media-provider></media-provider>
  <media-video-layout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"></media-video-layout>
</media-player>

<FullVideo bind:src={visibleVideo} alt="Anime Video" />
<FullScreenshot 
	bind:src={visibleScreenshot} 
	alt="Anime Screenshot" 
/>
