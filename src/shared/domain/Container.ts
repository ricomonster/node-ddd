import { Knex } from 'knex';

// Load up we're everything we need to register in the container
// Config
import { app } from './../../config/app';

// Libraries
import { database } from '../../libraries/Database';
import { Logger } from './../../libraries/Logger';

// Modules
import { UserRegistry } from './../../modules/user';

// Shared
import { Models } from './Model';

interface ConfigRegistry {
  app: typeof app;
  database: Knex.Config;
}

interface DefaultContainerRegistry {
  uuid: string;
  config: ConfigRegistry;
  logger: Logger;
  database: typeof database;
}

type ModuleRegistry = UserRegistry;

type ContainerRegistry =
  DefaultContainerRegistry &
  Models &
  // Modules
  ModuleRegistry;

export { ContainerRegistry };
