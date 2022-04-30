// Functionality to test
import UserModel from '../../infrastructure/UserModel';

// Test dependencies
import { database, connect } from '../../../../libraries/Database';

describe('Module :: User :: Infrastructure :: UserModel', () => {
  let userId = 0;

  // Sample data
  const data = {
    name: 'Foo Name',
    email: 'foo-email@website.com',
    password: 'foopassword',
  };

  beforeAll(() => {
    connect();
  });

  afterAll(async () => {
    await database.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    await database.destroy();
  });

  it('should create and save a user.', async () => {
    const newUser = await UserModel.query().insert(data);

    expect(newUser).toBeTruthy();
    expect(newUser).toHaveProperty('id');
    expect(newUser).toHaveProperty('name');
    expect(newUser).toHaveProperty('email');
    expect(newUser).toHaveProperty('password');
    expect(newUser?.name).toBe(data.name);
    expect(newUser?.email).toBe(data.email);
    expect(newUser?.password).toBe(data.password);

    userId = newUser.id || 0;
  });

  it('should throw an error if a unique value is being save again.', async () => {
    try {
      await UserModel.query().insert(data);
      throw new Error('should not go here.');
    } catch (error) {
      expect(error).toBeTruthy();

      if (error instanceof Error) {
        expect(error.message).toBe('insert into "users" ("created_at", "email", "name", "password") ' +
          'values ($1, $2, $3, $4) returning "id" - duplicate key value violates unique constraint ' +
          '"users_email_unique"'
        );
      }
    }
  });

  it('should fetch a user using its id.', async () => {
    const foundUser = await UserModel.query().findById(userId);

    expect(foundUser).toBeTruthy();
    expect(foundUser).toHaveProperty('id');
    expect(foundUser?.id).toBe(userId);
  });

  it('should fetch a user using a specific column value.', async () => {
    const foundUser = await UserModel.query().findOne('email', data.email);

    expect(foundUser).toBeTruthy();
    expect(foundUser).toHaveProperty('id');
    expect(foundUser).toHaveProperty('email');
    expect(foundUser?.email).toBe(data.email);
  });

  it('should update a user record.', async () => {
    const updateResult = await UserModel.query().findById(userId)
      .patch({
        name: 'Foo Name 2',
      });

    expect(updateResult).toBeTruthy();
    expect(updateResult).toBe(1);
  });

  it('should delete the user record.', async () => {
    await UserModel.query().deleteById(userId);

    const deletedUser = await UserModel.query().findById(userId);

    expect(deletedUser).toBe(undefined);
  });
});
