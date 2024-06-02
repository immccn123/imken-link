import { prisma } from "@/app/prisma";
import { PERMISSION_TABLE } from "@/constant/permission";
import { abort, parseInt } from "@/utils";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? abort(`GITHUB_ID is not set`),
			clientSecret:
				process.env.GITHUB_SECRET ?? abort(`GITHUB_SECRET is not set`),
			name: "github",
		}),
	],
	pages: {
		signIn: "/$/login",
		error: "/$/login",
	},
	callbacks: {
		session: ({ session, token }) => {
			session.userId = token.sub;
			return session;
		},

		async signIn({ user, account, profile, email, credentials }) {
			// check if the database has 0 users
			// if so, this user has the root permission
			if ((await prisma.user.count()) === 0) {
				await prisma.user.create({
					data: {
						githubUid: parseInt(user.id),
						permission: -1, // has all permission
					},
				});
			} else {
				// otherwise, check if the user has permission to login
				const loginUser = await prisma.user.findUnique({
					where: { githubUid: parseInt(user.id) },
				});

				if (
					loginUser === null ||
					(loginUser.permission.toNumber() & PERMISSION_TABLE.LOGIN) === 0
				) {
					return false;
				}
			}

			return true;
		},
	},
	secret: process.env.APP_SECRET ?? abort("APP_SECRET is not set"),
};
