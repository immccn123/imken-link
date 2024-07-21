import { updateSession } from '$lib/session.js';

export async function load({ cookies }) {
	await updateSession(cookies)
}
