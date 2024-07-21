import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";
import { panic } from "$lib";
import { createOAuthAppAuth } from "@octokit/auth-oauth-app";

const clientId = GITHUB_CLIENT_ID ?? panic("GITHUB_CLIENT_ID is not set")

export const auth = createOAuthAppAuth({
	clientType: "oauth-app",
	clientId,
	clientSecret: GITHUB_CLIENT_SECRET ?? panic("GITHUB_CLIENT_SECRET is not set"),
})

export const getAuthUrl = () =>
	`https://github.com/login/oauth/authorize?scope=user:email&client_id=${clientId}`

