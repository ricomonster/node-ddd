const { expect } = require('chai');
const User = require('src/domain/User');

const { user: userMock } = require('test/support/mock');

describe('Domain :: User', () => {
  context('should work properly', () => {
    it('should return data properly', () => {
      const user = new User(userMock);

      expect(user.toJSON().email).to.equal(userMock.email);
      expect(user.toJSON().name).to.equal(userMock.name);
    });
  });
});
