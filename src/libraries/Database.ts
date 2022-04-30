import { Model, knexSnakeCaseMappers } from 'objection';
import knex, { Knex } from 'knex';

// Configuration
import databaseConfig from '../config/database';

let database: Knex<any, unknown[]>;

export const connect = (): Knex<any, unknown[]> => {
  // Setup the knex database connection
  database = knex({ ...databaseConfig, ...knexSnakeCaseMappers() });

  // Setup objectionjs db connection
  Model.knex(database);

  return database;
};

connect();
export { database };
