import { env } from "$env/dynamic/private";
import { panic } from "$lib";
import type { Cookies } from "@sveltejs/kit";
import { error } from "console";
import * as jose from 'jose'

const secret = jose.base64url.decode(env.APP_SECRET ?? panic("APP_SECRET is not defined"));
const DEFAULT_SESSION: App.Session = { isHuman: false }

export async function requireLogin(cookies: Cookies) {
	const session = await updateSession(cookies);
	if (session?.userId === undefined) {
		error(401, "Unauthorized")
	}
	return session;
}

export async function getSession(cookies: Cookies) {
	return await
		getSessionByToken(cookies.get('session')) ?? DEFAULT_SESSION;
}

async function getSessionByToken(token?: string) {
	if (token === undefined) return undefined;
	try {
		const { payload } = await jose.jwtDecrypt(token, secret)
		return JSON.parse(payload.sub!) as App.Session;
	} catch (e) {
		console.error(e);
		return undefined;
	}
}

export async function createSession(session: App.Session) {
	return await
		new jose.EncryptJWT({ sub: JSON.stringify(session) })
			.setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
			.setExpirationTime('30min')
			.encrypt(secret);
}

export async function updateSession(cookies: Cookies, update: Partial<App.Session> = {}) {
	const session: App.Session = await getSession(cookies) ?? DEFAULT_SESSION;
	Object.assign(session, update);
	cookies.set(
		'session',
		await createSession(session),
		{ path: '/' }
	);

	return session;
}
