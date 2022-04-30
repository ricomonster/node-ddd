import { ModelClass } from 'objection';

// Function to test
import CreateUser from '../../application/CreateUser';

// Function dependencies
import { database, connect } from '../../../../libraries/Database';

import UserModel from '../../infrastructure/UserModel';
import UserRepository from '../../infrastructure/UserRepository';

// Typings
import { ContainerRegistry } from '../../../../shared/domain/Container';

describe('Modules :: User :: Application :: CreateUser', () => {
  let createUser: CreateUser;

  beforeAll(async () => {
    // Setup database connection
    connect();

    // Truncate tables
    await database.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');

    // Instantiate
    const userModel: ModelClass<UserModel> = UserModel;
    const userRepository = new UserRepository({ userModel } as ContainerRegistry);

    createUser = new CreateUser({ userRepository } as ContainerRegistry);
  });

  afterAll(async () => {
    await database.destroy();
  });

  it('should create a user.', async () => {
    const data = {
      email: 'email@email.com',
      name: 'Foo Name',
      password: 'password',
    };

    const user = await createUser.start(data);

    expect(user).toBeTruthy();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user.email).toBe(data.email);
  });
});
