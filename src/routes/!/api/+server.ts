import { createLinkValidator, getLinkValidator, removeLinkValidator } from '$lib/api/schema.js';
import { db } from '$lib/db/connection.js';
import { links } from '$lib/db/schema.js';
import { requireLogin } from '$lib/session.js';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function DELETE({ request }) {
	const payload = await request.json().catch(() => ({}));
	const body = removeLinkValidator.safeParse(payload);

	if (!body.success) {
		error(400, {
			message: "Bad Request",
			validateErr: body.error,
		});
	}

	try {
		const result = await db.delete(links).where(eq(links.id, body.data.id)).returning();
		return json(result)
	} catch (e) {
		if ('code' in (e as any)) {
			return json(
				{ type: 'linkNotFound' } as App.ErrorResponse,
				{ status: 409 }
			);
		}

		throw e;
	}
}

export async function PUT({ request, cookies }) {
	const payload = await request.json().catch(() => ({}));
	const body = createLinkValidator.safeParse(payload);

	if (!body.success) {
		error(400, {
			message: "Bad Request",
			validateErr: body.error,
		});
	}

	await requireLogin(cookies);

	try {
		const result = await db.insert(links).values(body.data).returning();
		return json(result)
	} catch (e) {
		if ('code' in (e as any)) {
			return json(
				{ type: 'duplicateSlug' } as App.ErrorResponse,
				{ status: 409 }
			);
		}

		throw e;
	}
}

export async function POST({ request, cookies }) {
	const payload = await request.json().catch(() => ({}));
	const body = getLinkValidator.safeParse(payload);

	if (!body.success) {
		error(400, {
			message: "Bad Request",
			validateErr: body.error,
		});
	}

	await requireLogin(cookies);

	const { offset, limit } = body.data;
	const result = await db.query.links.findMany({
		where: (fields, { gt }) => gt(fields.id, offset),
		limit,
		orderBy: (fields) => fields.id,
	})

	return json(result)
}
