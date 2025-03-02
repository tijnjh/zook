import type { PageServerLoad } from './$types';

async function fetchResults(query: string) {
    const url = `https://api.duckduckgo.com?q=${query}&format=json`;
    const response = await (await fetch(url)).json();
    return response;
}

export const load: PageServerLoad = async ({ params }: any) => {
    const results = await fetchResults(params.slug)
	return {
		data: results
	};
};
