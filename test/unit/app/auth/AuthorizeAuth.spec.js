const { expect } = require('chai');

const { user } = require('test/support/mock');

const AuthorizeAuth = require('src/app/auth/AuthorizeAuth');
const AuthRepository = require('src/infra/repositories/AuthRepository');

describe('App :: Auth :: AuthorizeAuth', () => {
  context('should work properly', () => {
    let authorizeAuth;

    before(() => {
      const MockUserRepository = {
        find: (field, value) => {
          return Promise.resolve({
            dataValues: {
              [field]: value,
              ...user,
            },
          });
        },
      };

      const currentTime = Math.round(Date.now() / 1000);
      const MockAuthRepository = {
        decodeToken: () => {
          return {
            id: 1,
            name: user.name,
            email: user.email,
            iat: currentTime,
            exp: currentTime + 3600,
          };
        },
      };

      authorizeAuth = new AuthorizeAuth({
        authRepository: MockAuthRepository,
        userRepository: MockUserRepository,
      });
    });

    it('will authorize and return the user', async () => {
      const user = await authorizeAuth.execute('sometoken');

      expect(user).to.be.an('object');
      expect(user).to.have.property('id');
      expect(user).to.have.property('email');
      expect(user.id).to.be.equal(1);
      expect(user.email).to.be.equal('email@email.com');
    });
  });

  context('invalid data provided', () => {
    it('should fail due to token is expired', () => {
      let authorizeAuth;

      before(() => {
        const MockUserRepository = {
          find: (field, value) => {
            return Promise.resolve({});
          },
        };

        authorizeAuth = new AuthorizeAuth({
          authRepository: new AuthRepository(),
          userRepository: MockUserRepository,
        });
      });
    });
  });
});
