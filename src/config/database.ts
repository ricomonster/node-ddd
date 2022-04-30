// Dependencies
import path from 'path';
import * as dotenv from 'dotenv';
import { Knex } from 'knex';

// Get the path of the .env
const dotEnvPath = path.resolve('./../../.env');

// Load up the config
dotenv.config({ path: dotEnvPath });

const database: Knex.Config = {
  client: process.env.DB_DIALECT || 'postgresql',
  connection: {
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
    host: process.env.DATABASE_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'node_ddd_ts',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
  },
  // This is useful in production instances
  pool: {
    // Maximum connection which postgresql or mysql can intiate
    max: 95,
    min: 0,
    // time require to reconnect
    acquireTimeoutMillis: 2000,
    // get idle connection
    idleTimeoutMillis: 2000,
    destroyTimeoutMillis: 1000,
  },
  migrations: {
    directory: './../shared/infrastructure/database/migrations',
    stub: './../../config/stubs/migrations.stub',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './../shared/infrastructure/database/seeds',
    stub: './../../config/stubs/seeds.stub',
  },
};

export type { database };
export default database;
