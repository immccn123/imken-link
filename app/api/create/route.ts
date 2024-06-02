import { NextRequest } from "next/server";
import { createLinkSchema } from "@/model/apiCreate";
import { nanoid } from "nanoid";
import { prisma } from "@/app/prisma";

import { Prisma } from "@prisma/client";

import "@/utils/bigint";
import { validateSession } from "@/utils/auth/server";

export async function POST(request: NextRequest) {
	try {
		validateSession(request.headers.get("api-key"));
	} catch (e) {
		return e as Response;
	}

	const data = await request.json();
	const { data: result, error: zodError } = createLinkSchema.safeParse(data);

	if (!result) {
		return Response.json(
			{
				error: zodError.message,
				detail: zodError.issues,
			},
			{ status: 400 },
		);
	}

	if (result.slug?.length == 0) result.slug = undefined;

	const slug = result.slug ?? nanoid(12);
	const passphrase = result.passphrase ?? null;
	const target = result.target;

	try {
		await prisma.link.create({ data: { slug, passphrase, target } });
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			// https://www.prisma.io/docs/orm/reference/error-reference#p2002
			if (e.code === "P2002") {
				return Response.json(
					{
						error: `duplicate slug`,
						detail: `slug ${slug} already exists.`,
					},
					{ status: 409 },
				);
			}
		}
		throw e;
	}

	return Response.json({ slug }, { status: 200 });
}
