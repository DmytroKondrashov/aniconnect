import type { Anime } from './anime';

export type AnimePageData = {
	anime: Anime;
	loading: boolean;
	errors: string[];
};
