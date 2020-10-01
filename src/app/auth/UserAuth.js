class UserAuth {
  constructor() {
    this.user = {};
  }

  setUser(user) {
    this.user = user;
    return this;
  }

  getUser() {
    return this.user;
  }
}

module.exports = UserAuth;
