import { getAuthUrl } from '$lib/github.js';
import { getSession } from '$lib/session.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const session = await getSession(cookies);
	if (session?.userId) redirect(307, "/!/dash");

	return { authUrl: getAuthUrl() }
}
