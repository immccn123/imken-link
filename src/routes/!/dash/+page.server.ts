import { getSession } from '$lib/session.js';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const session = await getSession(cookies);

	if (session?.userId === undefined) redirect(307, '/!/login');

	return { session }
}

export const ssr = false
