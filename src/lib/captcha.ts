import { TURNSTILE_SECRET } from "$env/static/private";

export async function validateCaptcha(token: string) {
	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: JSON.stringify({
			secret: TURNSTILE_SECRET,
			response: token,
		}),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const outcome = await result.json();
	return outcome.success
}