import { error, redirect } from "@sveltejs/kit";
import { db } from "../../lib/db/connection";
import { linkFlag } from "$lib/constants";
import { getSession } from "$lib/session";
import { TURNSTILE_SITE_KEY } from "$env/static/private";

// db.query
export async function load({ params, cookies }): Promise<CaptchaRequired | CopyRequired> {
	const result = await db.query.links.findFirst({
		where: (fields, operators) => operators.eq(fields.slug, params.slug),
	});

	if (result === undefined)
		error(404, 'Not found');

	const session = await getSession(cookies);
	const captchaRequired = (session.isHuman === false) && !!(result.flag & linkFlag.captchaRequired);
	const copyRequired = !!(result.flag & linkFlag.copyRequired);

	if (captchaRequired) return { type: "captcha", captchaRequired, siteKey: TURNSTILE_SITE_KEY }
	if (copyRequired) return { type: "copy", copyRequired, url: result.destination }

	redirect(302, result.destination);
}

export const ssr = true;

interface CaptchaRequired {
	type: "captcha"
	captchaRequired: true
	siteKey: string
}

interface CopyRequired {
	type: "copy"
	copyRequired: true
	url: string
}
