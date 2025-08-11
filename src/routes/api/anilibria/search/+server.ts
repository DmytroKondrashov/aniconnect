import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const search = url.searchParams.get('search');
	
	if (!search) {
		return json({ error: 'Search parameter is required' }, { status: 400 });
	}

	try {
		const response = await fetch(`https://api.anilibria.tv/v3/title/search?search=${encodeURIComponent(search)}`);
		
		if (!response.ok) {
			return json({ error: 'Failed to fetch from anilibria API' }, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Error fetching from anilibria API:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}; 