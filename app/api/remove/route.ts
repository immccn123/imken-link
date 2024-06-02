import { NextRequest } from "next/server";
import { removeLinkSchema } from "@/model/apiCreate";
import { tryValidateSession } from "@/utils/auth/server";
import { prisma } from "@/app/prisma";

export async function DELETE(request: NextRequest) {
	{
		const response = await tryValidateSession(request.headers.get("api-key"));
		if (response) return response;
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
