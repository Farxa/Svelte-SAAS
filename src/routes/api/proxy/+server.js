import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	// Parse the request body from the client
	const requestBody = await request.json();

	// Forward the request to the external API
	const response = await fetch('https://n8n.thearc.dev/webhook/pricing', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	});

	// Check if the external request was successful
	if (!response.ok) {
		// Handle error
		return json({ error: 'Failed to fetch data from external API' }, { status: response.status });
	}

	// Return the external API's response to the client
	const data = await response.json();
	return json(data);
}
