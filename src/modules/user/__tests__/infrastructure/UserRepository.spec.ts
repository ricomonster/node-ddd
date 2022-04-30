import { ModelClass } from 'objection';

// Function to test
import UserRepository from '../../infrastructure/UserRepository';

// Function dependencies
import { database, connect } from '../../../../libraries/Database';

import UserModel from '../../infrastructure/UserModel';

// Typings
import { ContainerRegistry } from '../../../../shared/domain/Container';

describe('Modules :: User :: Infrastructure :: Repository :: UserRepository', () => {
  let userRepository: UserRepository;

  const data = {
    name: 'Foo Name',
    email: 'foo@email.com',
    password: 'foopassword',
  };

  beforeAll(async () => {
    connect();

    const userModel: ModelClass<UserModel> = UserModel;

    // Instantiate the function to test.
    userRepository = new UserRepository({ userModel } as ContainerRegistry);

    // Create sample users
    await userModel.query().insert({ name: 'Foo Name 2', email: 'fooemail2@email.com', password: '123456' });
    await userModel.query().insert({ name: 'Foo Name 3', email: 'fooemail3@email.com', password: '123456' });
  });

  afterAll(async () => {
    // Truncate the contents of the table we're going to use
    await database.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    await database.destroy();
  });

  it('should create and save a user.', async () => {
    const newUser = await userRepository.create(data);

    expect(newUser).toBeTruthy();
    expect(newUser).toHaveProperty('id');
    expect(newUser).toHaveProperty('name');
    expect(newUser).toHaveProperty('email');
    expect(newUser).toHaveProperty('password');
    expect(newUser?.name).toBe(data.name);
    expect(newUser?.email).toBe(data.email);
    expect(newUser?.password).toBe(data.password);
  });

  it('should throw an error if a unique value is being save again.', async () => {
    try {
      await userRepository.create(data);
      throw new Error('should not go here.');
    } catch (error) {
      expect(error).toBeTruthy();

      if (error instanceof Error) {
        expect(error.message).toBe(
          'insert into "users" ("created_at", "email", "name", "password") values ($1, $2, $3, $4) ' +
          'returning * - duplicate key value violates unique constraint "users_email_unique"'
        );
      }
    }
  });

  it('should fetch a user using its id.', async () => {
    const foundUser = await userRepository.findById(1);

    expect(foundUser).toBeTruthy();
    expect(foundUser).toHaveProperty('id');
    expect(foundUser?.id).toBe(1);
  });

  it('should fetch a user using a specific column value.', async () => {
    const foundUser = await userRepository.findByField('email', data.email);

    expect(foundUser).toBeTruthy();
    expect(foundUser).toHaveProperty('id');
    expect(foundUser).toHaveProperty('email');
    expect(foundUser?.email).toBe(data.email);
  });

  it('should fetch a user based on the given options.', async () => {
    const foundUser = await userRepository.findOne({
      where: { email: data.email },
    });

    expect(foundUser).toBeTruthy();
    expect(foundUser).toHaveProperty('id');
    expect(foundUser).toHaveProperty('email');
    expect(foundUser?.email).toBe(data.email);
  });

  it('should return all the user records saved.', async () => {
    const allUsers = await userRepository.findAll();

    expect(allUsers).toBeTruthy();
    expect(allUsers).toHaveProperty('results');
    expect(allUsers).toHaveProperty('total');
    expect(allUsers.total).toBe(3);
  });

  it('should get users based on the likeness of the filter.', async () => {
    const filteredUsers = await userRepository.findAll({
      where: {
        name: { like: 'Foo' },
      },
    });

    expect(filteredUsers).toBeTruthy();
    expect(filteredUsers).toHaveProperty('results');
    expect(filteredUsers).toHaveProperty('total');
    expect(filteredUsers.total).toBe(3);
  });

  it('should get users ordered by according to the given parameters.', async () => {
    const orderedUser = await userRepository.findAll({
      order: [['id', 'desc']],
    });

    expect(orderedUser).toBeTruthy();
    expect(orderedUser).toHaveProperty('results');
    expect(orderedUser).toHaveProperty('total');
    expect(orderedUser.total).toBe(3);
    expect(orderedUser.results[0].id).toBe(3);
  });

  it('should get users based on the value of the filter.', async () => {
    const filteredUsers = await userRepository.findAll({
      where: {
        name: { '=': 'Foo Name' },
      },
    });

    expect(filteredUsers).toBeTruthy();
    expect(filteredUsers).toHaveProperty('results');
    expect(filteredUsers).toHaveProperty('total');
    expect(filteredUsers.total).toBe(1);
    expect(filteredUsers.results[0].name).toBe('Foo Name');
  });

  it('should get users based multiples values in the filter.', async () => {
    const filteredUsers = await userRepository.findAll({
      where: {
        email: {
          in: 'foo@email.com,fooemail2@email.com,fooemail3@email.com',
        },
      },
    });

    expect(filteredUsers).toBeTruthy();
    expect(filteredUsers).toHaveProperty('results');
    expect(filteredUsers).toHaveProperty('total');
    expect(filteredUsers.total).toBe(3);
  });

  it('should get users based multiples values in the filter in a different setup.', async () => {
    const filteredUsers = await userRepository.findAll({
      where: {
        email: 'foo@email.com,fooemail2@email.com,fooemail3@email.com',
      },
    });

    expect(filteredUsers).toBeTruthy();
    expect(filteredUsers).toHaveProperty('results');
    expect(filteredUsers).toHaveProperty('total');
    expect(filteredUsers.total).toBe(3);
  });

  it('should get users less than the given filter.', async () => {
    const filteredUsers = await userRepository.findAll({
      where: {
        createdAt: {
          '<': new Date().toISOString(),
        },
      },
    });

    expect(filteredUsers).toBeTruthy();
    expect(filteredUsers).toHaveProperty('results');
    expect(filteredUsers).toHaveProperty('total');
    expect(filteredUsers.total).toBe(3);
  });

  it('should update a user record.', async () => {
    const updatedUser = await userRepository.update(1, { name: 'Foo Name 2' });

    expect(updatedUser).toBeTruthy();
    expect(updatedUser).toBeInstanceOf(UserModel);
    expect(updatedUser?.name).toBe('Foo Name 2');
  });
});
