// Dependencies
import path from 'path';
import * as dotenv from 'dotenv';

// Get the path of the .env
const dotEnvPath = path.resolve('./../../.env');

// Load up the config
dotenv.config({ path: dotEnvPath });

const app = {
  name: process.env.APP_NAME || 'node-ddd-ts',
  env: process.env.NODE_ENV || 'production',
  debug: process.env.APP_DEBUG || false,
  url: process.env.APP_URL || 'http://localhost',
  timezone: 'UTC',
  key: process.env.APP_KEY || 'RandomString',
  port: process.env.APP_PORT || 3000,
};

export { app };
