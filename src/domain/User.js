const { attributes } = require('structure');

const User = attributes({
  id: Number,
  name: String,
  email: String,
  emailVerifiedAt: Number,
  password: String,
  active: Boolean,
  createdAt: Number,
  updatedAt: Number,
})(class User {});

User.prototype.toJSON = () => {
  const user = { ...this.get() };

  delete user.password;
  return user;
};

module.exports = User;
