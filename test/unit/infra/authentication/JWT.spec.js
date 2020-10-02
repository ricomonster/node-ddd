const { expect } = require('chai');

const JWT = require('src/infra/authentication/JWT');

describe('Infra :: Authentication :: JWT', () => {
  context('should work properly', () => {
    let jwt;
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmFtZSIsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwiaWF0IjoxNjAxNjA0MjA5LCJleHAiOjE2MDE2MDc4MDl9.zK3zRHugUXRHCdmQQZQxbSR7vxEe9YS9ArbgTasUnVM';

    before(() => {
      jwt = new JWT();
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

    it('should generate/sign a token', () => {
      const token = jwt.sign({ name: 'name', email: 'email@email.com' }, 'secret', 3600);

      // We cannot test it directly as tokens tend to change every generation
      // So we're going to decode and check if the values are there
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
