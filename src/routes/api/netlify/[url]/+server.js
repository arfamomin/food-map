import { json } from '@sveltejs/kit';
export async function GET(request) {
	const { url } = request.params;
	const query = request.url.searchParams;
	const host = `https://calmatters-api-fire-dashboard.netlify.app/.netlify/functions`; // example url for where the endpoints live on netlify. you will probably want to change this
	const u = `${host}/${url}?${query.toString()}`;
	const response = await fetch(u);
	const j = await response.json();
	return json(j)
}
