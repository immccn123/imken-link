import { NextRequest } from "next/server";
import { removeLinkSchema } from "@/model/apiCreate";
import { validateSession } from "@/utils/auth/server";
import { prisma } from "@/app/prisma";

export async function DELETE(request: NextRequest) {
	try {
		validateSession(request.headers.get("api-key"));
	} catch (e) {
		return e as Response;
	}

	const data = await request.json();
	const { data: result, error: zodError } = removeLinkSchema.safeParse(data);

	if (!result) {
		return Response.json(
			{
				error: zodError.message,
				detail: zodError.issues,
			},
			{ status: 400 },
		);
	}

	const slug = result.slug;
	await prisma.link.delete({ where: { slug } });

	return Response.json(null, { status: 200 });
}
