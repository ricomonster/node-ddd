const { expect } = require('chai');

const JWT = require('src/infra/authentication/JWT');
const Encryption = require('src/infra/encryption/Encryption');
const AuthRepository = require('src/infra/repositories/AuthRepository');

const { jwtToken, user: userMock } = require('test/support/mock');

describe('Infra :: Repositories :: AuthRepository', () => {
  context('should work properly', () => {
    let authRepository;
    let generatedToken;

    before(() => {
      authRepository = new AuthRepository({
        encryption: new Encryption(),
        jwt: new JWT(),
      });
    });

    it('should decode token', () => {
      const result = authRepository.decodeToken(jwtToken);

      expect(result).to.be.an('object');
      expect(result).to.have.property('name');
      expect(result).to.have.property('email');
      expect(result).to.have.property('iat');
      expect(result).to.have.property('exp');
    });

    it('should generate a token', () => {
      generatedToken = authRepository.generateToken(
        { name: 'name', email: 'email@email.com' },
        'secret',
        3600
      );

      expect(generatedToken).to.be.string;
    });

    it('should verify the token as valid', () => {
      const result = authRepository.verifyToken(generatedToken, 'secret');

      expect(result).to.be.true;
    });

    it('should verify the password', () => {
      const result = authRepository.verifyPassword('password', userMock.password);
    });
  });
});
