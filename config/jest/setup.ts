import * as dotenv from 'dotenv';

dotenv.config();

// This will make sure that we're using a different database
if (process.env.DB_DATABASE && process.env.DB_DATABASE.indexOf('_test') === -1) {
  process.env.DB_DATABASE = `${process.env.DB_DATABASE}_test`;
}
