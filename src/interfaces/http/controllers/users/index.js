const { Router } = require('express');

const container = require('../../../../container');
const { createUser } = require('../../../../app/user');

const router = new Router();

const {
  repository: { userRepository },
} = container.cradle;

router.get('/', (req, res) => {
  console.log('r', userRepository);
  new createUser({ userRepository }).execute({});
});

module.exports = router;
