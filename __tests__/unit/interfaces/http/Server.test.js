const supertest = require('supertest');

const Server = require('../../../../src/interfaces/http/Server');

describe('Unit :: Interfaces :: HTTP :: Server', () => {
  let serverInstance;
  beforeAll(() => {
    serverInstance = new Server({
      config: {
        app: {
          port: 3000,
        },
      },
      logger: {
        info: jest.fn(),
      },
    });

    serverInstance.start();
  });

  afterAll(() => {
    serverInstance.stop();
  });

  test('the server should run and accessible.', async () => {
    await supertest(serverInstance.app)
      .get('/')
      .expect(200)
      .then((response) => {
        expect(typeof response.body === 'object').toBeTruthy();
        expect(response.body.message).toBeTruthy();
        expect(response.body.message).toBe('NodeJS DDD Boilerplate v1.2.0');
      });
  });

  test('the server should run and the API endpoint is accessible.', async () => {
    await supertest(serverInstance.app)
      .get('/api')
      .expect(200)
      .then((response) => {
        expect(typeof response.body === 'object').toBeTruthy();
        expect(response.body.message).toBeTruthy();
        expect(response.body.message).toBe('NodeJS DDD Boilerplate API Endpoint v1.2.0');
      });
  });

  test('the server should return a 404 response if endpoint does not exists.', async () => {
    await supertest(serverInstance.app).get('/not-found').expect(404);
  });
});
