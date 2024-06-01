import { validateSessionOrApiKey } from "@/utils/auth/server";
import { NextRequest } from "next/server";

import "@/utils/bigint";
import { tryParseInt } from "@/utils";
import { prisma } from "@/app/prisma";

export async function GET(request: NextRequest) {
	try {
		validateSessionOrApiKey(request.headers.get("api-key"));
	} catch (e) {
		return e;
	}

	const search = new URL(request.url).searchParams;
	const page = tryParseInt(search.get("page")) ?? 1;
	const perPage = tryParseInt(search.get("perPage")) ?? 25;
	const contains = search.get("contains") ?? undefined;

	const result = await prisma.link.findMany({
		skip: (page - 1) * perPage,
		take: perPage,
		where: { target: { contains } },
		select: {
			slug: true,
			target: true,
			createdAt: true,
		},
		orderBy: { createdAt: "desc" },
	});

	return Response.json(result);
}