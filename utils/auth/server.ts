import { authOptions } from "@/app/api/auth/[...nextauth]/authOption";
import { prisma } from "@/app/prisma";
import { PERMISSION_TABLE } from "@/constant/permission";
import { getServerSession } from "next-auth";

/**
 *
 * @param apiKey
 * @returns Nothing
 *
 * @throws Response.
 *
 * @example
 * ```ts
 * try {
 *   await validateSessionOrApiKey(apiKey);
 * } catch (e) {
 *   return e as Response;
 * }
 * ```
 */
export async function validateSession(apiKey?: string | null) {
	const session = await getServerSession(authOptions);

	if (session === null || typeof session.userId !== "number") {
		if (apiKey === null) throw new Response(null, { status: 401 });
		const key = await prisma.apiKey.findUnique({
			where: { key: apiKey },
			select: { owner: true },
		});
		if (!key) throw new Response(null, { status: 401 });
		if (!(key.owner.permission.toNumber() & PERMISSION_TABLE.CREATE_LINK)) {
			throw new Response(null, { status: 403 });
		}
	}
}

/**
 *
 * @param apiKey
 * @returns Nothing
 *
 * @throws Response.
 *
 * @example
 * ```ts
 * try {
 *   await validateSessionOrApiKey(apiKey);
 * } catch (e) {
 *   return e as Response;
 * }
 * ```
 */
export async function tryValidateSession(apiKey?: string | null) {
	const session = await getServerSession(authOptions);

	if (session === null || typeof session.userId !== "number") {
		if (apiKey === null) return new Response(null, { status: 401 });
		const key = await prisma.apiKey.findUnique({
			where: { key: apiKey },
			select: { owner: true },
		});
		if (!key) return new Response(null, { status: 401 });
		if (!(key.owner.permission.toNumber() & PERMISSION_TABLE.CREATE_LINK)) {
			return new Response(null, { status: 403 });
		}
	}
}
