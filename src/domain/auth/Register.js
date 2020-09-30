const { attributes } = require('structure');

const Register = attributes({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    email: true,
  },
  password: {
    type: String,
    required: true,
  },
})(class Register {});

module.exports = Register;
