<script lang="ts">
	import type Anime from '$lib/interfaces/Anime';

	interface Props extends Record<string, unknown> {
		anime: Anime;
		class: string;
	}

	let { anime, class: className }: Props = $props();
</script>

<!-- <a class={['card', className]} href="/{anime.id}">
	<div class="card-image">
		<figure class="image">
			<img src={anime.poster.mainUrl} alt="Placeholder image" />
		</figure>
	</div>
	<div class="p-2 is-flex is-flex-direction-column is-align-items-center">
		<p class="is-5 has-text-centered title">{anime.name}</p>
		<p class="is-6 has-text-centered subtitle">{anime.russian}</p>
	</div>
</a> -->

<a
	class={[
		'block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden',
		className
	]}
	href="/{anime.id}"
>
	<div class="aspect-[3/4] overflow-hidden">
		<img src={anime.poster.mainUrl} alt="Placeholder image" class="w-full h-full object-cover" />
	</div>
	<div class="p-2 flex flex-col items-center">
		<p class="text-lg font-bold text-center leading-tight">{anime.name}</p>
		<p class="text-base text-gray-600 text-center mt-1">{anime.russian}</p>
		<!-- <div class="text-sm text-gray-700 overflow-hidden" style="text-overflow: ellipsis; max-height: 300px;">
			{@html anime.descriptionHtml}
		</div> -->
	</div>
</a>
