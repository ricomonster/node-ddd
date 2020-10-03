const { expect } = require('chai');

const UserAuth = require('src/app/auth/UserAuth');

const { user: userMock } = require('test/support/mock');

describe('App :: Auth :: UserAuth', () => {
  context('should work properly', () => {
    let userAuth;

    before(() => {
      userAuth = new UserAuth();
    });

    it('should set the user', () => {
      const result = userAuth.setUser(userMock);

      expect(result).to.be.an('object');
      expect(result).to.have.property('user');
      expect(result.user).to.be.an('object');
      expect(result.user.id).to.be.equal(userMock.id);
      expect(result.user.email).to.be.equal(userMock.email);
    });

    it('should get the user', () => {
      const result = userAuth.getUser();

      expect(result).to.be.an('object');
      expect(result.id).to.be.equal(userMock.id);
      expect(result.email).to.be.equal(userMock.email);
    });
  });
});
