// dependencies
// controller
const BaseController = require('./BaseController');

class AuthController extends BaseController {
  constructor() {
    super();
    this.authRegister = this.operations.register;
  }

  /**
   * Auth Login
   *
   * @memberof AuthController
   */
  async login(req, res) {
    // run it
  }

  async register(req, res) {
    try {
      const user = await this.authRegister.execute(req.body);
      return res.status(200).json(user.toJSON());
    } catch (error) {
      console.log('err', error);
      return res.status(error.statusCode || 400).json(error.errors || { message: error.message });
    }
  }

  routes() {
    this.router.get('/login', this.login.bind(this));
    this.router.post('/register', this.register.bind(this));
    return this.router;
  }
}

module.exports = AuthController;
