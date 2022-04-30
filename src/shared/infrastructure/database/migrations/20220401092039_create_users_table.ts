import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('name').nullable();
      table.string('email').unique();
      table.string('password').notNullable();
      table.json('images').nullable();
      table.timestamps(false, true);
    });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTable('users');
};
