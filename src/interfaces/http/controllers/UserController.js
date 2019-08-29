// base controller
const BaseController = require('./BaseController');

class UserController extends BaseController {
  constructor() {
    super();
    this.createUser = this.operations.createUser;
  }

  async getUser(req, res) {
    await this.createUser.execute({});
    return res.send('Get User');
  }

  routes() {
    this.router.get('/', this.getUser.bind(this));
    return this.router;
  }
}

module.exports = UserController;
