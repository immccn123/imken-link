import { panic } from '$lib';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private';

const connectionString = DATABASE_URL ?? panic("Database URL is not set");

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client, { schema });
