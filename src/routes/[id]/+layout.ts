import type Anime from '$lib/interfaces/Anime.js';
import { getAnime } from '$lib/queries/getAnime';
import urql from '$lib/urql';

export async function load({ params }) {
	const { id } = params;

	let loading: boolean = true;
	let errors: string[] = [];
	let anime: Anime = null!;

	const { data, error } = await urql.query<{ animes: Anime[] }>(getAnime, { id }).toPromise();

	if (data?.animes) {
		anime = data?.animes[0];
	}

	if (error?.message) {
		errors.push(error.message);
	}

	loading = false;

	return {
		anime,
		loading,
		errors
	};
}
