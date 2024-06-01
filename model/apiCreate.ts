import { z } from "zod";

export const createLinkSchema = z.object({
	target: z.string(),
	slug: z.string().optional(),
	passphrase: z.string().optional(),
});

export const removeLinkSchema = z.object({
	slug: z.string(),
});
