import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema-pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL || 'postgresql://fysic_user:fysic_secret_password_2026@127.0.0.1:5434/cargorix_db';

export const pool = new Pool({
  connectionString,
});

export const pgDb = drizzle(pool, { schema });
