const { expect } = require('chai');
const User = require('src/domain/User');

describe('Domain :: User', () => {
  context('should work properly', () => {
    it('should return data properly', () => {
      const user = new User({
        email: 'email@email.com',
        name: 'Name',
      });

      expect(user.toJSON().email).to.equal('email@email.com');
      expect(user.toJSON().name).to.equal('Name');
    });
  });
});
