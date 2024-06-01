import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
 *   return e;
 * }
 * ```
 */
export async function validateSessionOrApiKey(apiKey?: string | null) {
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
