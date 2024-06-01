"use server";

import { notFound, redirect } from "next/navigation";
import { prisma } from "../prisma";
import { z } from "zod";

export default async function Redirect({
	params,
}: {
	params: { slug: string };
}) {
	const verify = z.string();
	const link =
		(await prisma.link.findUnique({
			where: { slug: verify.parse(params.slug) },
		})) ?? notFound();

	redirect(link.target);
}
