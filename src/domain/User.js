const { attributes } = require('structure');

const User = attributes({
  id: Number,
  name: String,
  email: String,
  password: String,
  active: Boolean,
  verifiedAt: Date,
  createdAt: Date,
  updatedAt: Date,
})(class User {});

User.prototype.toJSON = () => {
  const user = { ...this.get() };
  console.log('ss', user);
  delete user.password;
  return user;
};

module.exports = User;
