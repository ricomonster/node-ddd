import { asValue, createContainer, Lifetime } from 'awilix';
import { v4 as uuidv4 } from 'uuid';

// Config
import { app } from './config/app';
import databaseConfig from './config/database';

// Libraries
import { database, connect } from './libraries/Database';
import { Logger } from './libraries/Logger';

// Registry
import { ContainerRegistry } from './shared/domain/Container';

const uuid = uuidv4();
const container = createContainer<ContainerRegistry>();

// Each request will have a consistent identifier
const logger = new Logger(uuid);

// Load up the basic ones
container.register({
  uuid: asValue(uuid),
  config: asValue({ app, database: databaseConfig }),

  // Libraries
  database: asValue(database),
  logger: asValue(logger),
});

container.loadModules([
  'modules/**!(__tests__,__fixtures__)/application/*.{js,ts}',
  'modules/**/infrastructure/*Repository.{js,ts}',
  [
    // Objection.js ModelClass functions are all declared static so registering it using "asClass" will not work.
    'modules/**/infrastructure/*Model.{js,ts}',
    { register: asValue },
  ],
], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
  cwd: __dirname,
});

// Connect this instance to a database
connect();

logger.info(`Modules loaded: ${JSON.stringify(Object.keys(container.registrations))}`);

export { container };
