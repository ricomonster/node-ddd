const { expect } = require('chai');
const Login = require('src/domain/auth/Login');

describe('Domain :: Auth :: Login', () => {
  context('should work properly', () => {
    it('should return data properly', () => {
      const login = new Login({
        email: 'email@email.com',
        password: 'password123',
      });

      expect(login.toJSON().email).to.equal('email@email.com');
      expect(login.toJSON().password).to.equal('password123');
    });
  });

  context('validation', () => {
    it('should fail with invalid email address', () => {
      const params = { email: 'invalidemail', password: 'test' };

      const data = new Login(params);
      const { valid, errors } = data.validate(params);

      expect(valid).to.be.false;
      expect(errors).to.be.an('array');
      expect(errors[0]).to.have.property('message');
      expect(errors[0]).to.have.property('path');
      expect(errors[0].message).to.equal('"email" must be a valid email');
    });

    it('should fail when all fields are not provided or empty', () => {
      const data = new Login({});
      const { valid, errors } = data.validate({});

      expect(valid).to.be.false;
      expect(errors).to.be.an('array');
      expect(errors).to.have.length(2);
    });
  });
});
