import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get('id');
	
	if (!id) {
		return json({ error: 'ID parameter is required' }, { status: 400 });
	}

	try {
		const response = await fetch(`https://api.anilibria.tv/v3/title?id=${encodeURIComponent(id)}`);
		
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