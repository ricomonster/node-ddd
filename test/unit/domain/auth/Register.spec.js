const { expect } = require('chai');
const Register = require('src/domain/auth/Register');

describe('Domain :: Auth :: Register', () => {
  context('should work properly', () => {
    it('should return data properly', () => {
      const register = new Register({
        email: 'email@email.com',
        name: 'Name',
        password: 'password123',
      });

      expect(register.toJSON().email).to.equal('email@email.com');
      expect(register.toJSON().name).to.equal('Name');
      expect(register.toJSON().password).to.equal('password123');
    });
  });

  context('validation', () => {
    it('should fail with invalid email address', () => {
      const params = { email: 'invalidemail', name: 'test', password: 'test' };

      const data = new Register(params);
      const { valid, errors } = data.validate(params);

      expect(valid).to.be.false;
      expect(errors).to.be.an('array');
      expect(errors[0]).to.have.property('message');
      expect(errors[0]).to.have.property('path');
      expect(errors[0].message).to.equal('"email" must be a valid email');
    });

    it('should fail when all fields are not provided or empty', () => {
      const data = new Register({});
      const { valid, errors } = data.validate({});

      expect(valid).to.be.false;
      expect(errors).to.be.an('array');
      expect(errors).to.have.length(3);
    });
  });
});
