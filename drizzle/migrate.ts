/**
 * DO NOT import this file
 */

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { panic } from '../src/lib';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../src/lib/db/schema';
import postgres from 'postgres';
import 'dotenv/config'

const connectionString = process.env.DATABASE_URL ?? panic("Database URL is not set");

const client = postgres(connectionString, { prepare: false })
const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: "./drizzle" })
await client.end()

export default {} as never;
