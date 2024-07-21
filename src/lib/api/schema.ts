import { z } from "zod";

type Validated<T extends { parse: (...args: any) => any }> = ReturnType<T['parse']>

export const createLinkValidator = z.object({
	slug: z.string(),
	destination: z.string(),
	flag: z.coerce.number().optional().default(0),
})

export const getLinkValidator = z.object({
	offset: z.number().gte(0),
	limit: z.number().gt(1),
})

export const removeLinkValidator = z.object({
	id: z.number()
})

export type CreateLink = Validated<typeof createLinkValidator>;
export type GetLink = Validated<typeof getLinkValidator>;
export type RemoveLink = Validated<typeof removeLinkValidator>