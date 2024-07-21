import { validateCaptcha } from '$lib/captcha.js'
import { updateSession } from '$lib/session.js'
import { error, json } from '@sveltejs/kit'

export async function POST({request, cookies}) {
	const token = await request.json().then(x => x.token as string | undefined)
	if (token && await validateCaptcha(token)) {
		await updateSession(cookies, { isHuman: true })
		return json({ success: true })
	}

	error(403)
}