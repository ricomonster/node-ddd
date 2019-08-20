const { Router } = require('express');

class UserController {
  constructor() {
    // instantiate express router
    const router = new Router();

    router.get('/', (req, res) => {
      console.log('req', req);
    });

    return router;
  }
}

module.exports = UserController;
