import { auth } from '$lib/github.js';
import { error, redirect } from '@sveltejs/kit';
import { Octokit } from '@octokit/rest'
import { updateSession } from '$lib/session.js';
import { db } from '../../../lib/db/connection.js';
import { users } from '../../../lib/db/schema.js';
import { eq } from 'drizzle-orm';

export async function load({ request, cookies }) {
	const code = new URL(request.url).searchParams.get("code") ?? error(400, "Bad request");

	const result = await auth({
		type: "oauth-user",
		code,
	})

	const api = new Octokit({ auth: result.token })

	const uid = (await api.rest.users.getAuthenticated().then(({ data }) => data.id));

	const userCount = (await db.query.users.findMany()).length;

	if (userCount === 0) {
		await db.insert(users).values({
			githubUid: uid,
		});
	}

	const user = await db.selectDistinct()
		.from(users)
		.where(eq(users.githubUid, uid));

	if (user.length !== 0) {
		await updateSession(cookies, { userId: uid })
		redirect(302, "/!/dash");
	} else {
		error(403, `Account ID ${uid} is not allowed.`);
	}
}