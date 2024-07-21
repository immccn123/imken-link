import { integer, text, pgTable, serial, bigint } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	githubUid: integer('github_uid').notNull(),
})

export const links = pgTable('links', {
	id: serial('id').primaryKey(),
	slug: text('source').notNull().unique(),
	destination: text('destination').notNull(),
	flag: bigint('link_flag', { mode: 'number' }).notNull().default(0),
})

export const apiKeys = pgTable('api_keys', {
	id: serial('id').primaryKey(),
	key: text('key').notNull().unique(),
	ownerId: integer('owner').references(() => users.id).notNull(),
})

type InnerModel<U extends { $inferSelect: T }, T = unknown> = U['$inferSelect']

export type Link = InnerModel<typeof links>
export type ApiKey = InnerModel<typeof apiKeys>
export type User = InnerModel<typeof users>
