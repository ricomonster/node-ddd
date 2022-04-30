import { Context, Callback } from 'aws-lambda';

// Function to test
import registerUser from '../../../../interface/lambda/http/registerUser';

// Function dependencies
import { database, connect } from '../../../../../../libraries/Database';

import UserModel from '../../../../infrastructure/UserModel';

// Typings
import { LambdaResponse } from '../../../../../../shared/domain/Lambda';

describe('Modules :: Auth :: Interface :: Lambda :: HTTP :: registerUser', () => {
  const context = {} as Context;
  const callback = {} as Callback;

  beforeAll(async () => {
    // Setup database connection
    connect();

    // Create a sample user
    await UserModel.query().insert({
      name: 'Existing User',
      email: 'existing@email.com',
      password: 'password',
    });
  });

  afterAll(async () => {
    await database.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
    await database.destroy();
  });

  it('should create and save the user.', async () => {
    const event = {
      body: JSON.stringify({
        name: 'Foo Name',
        email: 'foo@email.com',
        password: 'password',
        confirm_password: 'password',
      }),
    } as unknown;

    const response = await registerUser(event, context, callback) as unknown;

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('headers');

    const typedResponse = response as LambdaResponse;
    if (typedResponse && typedResponse.body) {
      expect(typedResponse.statusCode).toBe(200);
      expect(typedResponse.body).toBe(JSON.stringify({ message: 'User created!' }));
    }
  });

  it('should throw an error if the event body is empty.', async () => {
    const event = {
      body: null,
    } as unknown;

    const response = await registerUser(event, context, callback) as unknown;

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('headers');

    const typedResponse = response as LambdaResponse;
    if (typedResponse && typedResponse.body) {
      expect(typedResponse.statusCode).toBe(400);
      expect(typedResponse.body).toBe(JSON.stringify({ message: 'Bad Request' }));
    }
  });

  it('should throw an error to validate the request body.', async () => {
    const event = {
      body: JSON.stringify({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
      }),
    } as unknown;

    const response = await registerUser(event, context, callback) as unknown;

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('headers');

    const typedResponse = response as LambdaResponse;
    if (typedResponse && typedResponse.body) {
      expect(typedResponse.statusCode).toBe(422);
      expect(typedResponse.body).toBe(JSON.stringify({
        errors: {
          name: ['The name field is required.'],
          email: ['The email field is required.'],
          password: ['The password field is required.'],
          confirm_password: ['The confirm password field is required.'],
        },
      }));
    }
  });

  it('should throw a server error if tries to create an existing user.', async () => {
    const event = {
      body: JSON.stringify({
        name: 'Foo Name',
        email: 'foo@email.com',
        password: 'password',
        confirm_password: 'password',
      }),
    } as unknown;

    const response = await registerUser(event, context, callback) as unknown;

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('headers');

    const typedResponse = response as LambdaResponse;
    if (typedResponse && typedResponse.body) {
      expect(typedResponse.statusCode).toBe(500);
      expect(typedResponse.body).toBe(JSON.stringify({ message: 'Internal Server Error' }));
    }
  });
});
