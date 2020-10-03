const { expect } = require('chai');

const JWT = require('src/infra/authentication/JWT');

describe('Infra :: Authentication :: JWT', () => {
  context('should work properly', () => {
    let jwt;
    let token;

    before(() => {
      jwt = new JWT();
    });

    it('should generate/sign a token', () => {
      token = jwt.sign({ name: 'name', email: 'email@email.com' }, 'secret', 3600);

      expect(token).to.be.string;
    });

    it('decode token properly', () => {
      const decodedToken = jwt.decode(token);

      expect(token).to.be.string;
      expect(decodedToken).to.have.property('name');
      expect(decodedToken).to.have.property('email');
      expect(decodedToken).to.have.property('iat');
      expect(decodedToken).to.have.property('exp');
      expect(decodedToken.name).to.equal('name');
      expect(decodedToken.email).to.equal('email@email.com');
    });

    it('should verify the token', () => {
      const data = jwt.verify(token, 'secret');

      expect(data).to.be.an('object');
      expect(data).to.have.property('name');
      expect(data).to.have.property('email');
      expect(data).to.have.property('iat');
      expect(data).to.have.property('exp');
      expect(data.name).to.equal('name');
      expect(data.email).to.equal('email@email.com');
    });
  });
});
