const { expect } = require('chai');

const Encryption = require('src/infra/encryption/Encryption');

describe('Infra :: Encryption :: Encryption', () => {
  context('should work properly', () => {
    let encryption;
    let encryptedPassword;

    before(() => {
      encryption = new Encryption();
    });

    it('should encrypt text', () => {
      encryptedPassword = encryption.encrypt('string');

      // We cannot properly test the exact value of it
      expect(encryptedPassword).to.be.string;
    });

    it('should compare the password and the encrypted string', () => {
      const compared = encryption.compare('string', encryptedPassword);

      expect(compared).to.be.true;
    });
  });
});
