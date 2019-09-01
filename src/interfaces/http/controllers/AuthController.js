// dependencies
// controller
const BaseController = require('./BaseController');

class AuthController extends BaseController {
  constructor() {
    super();
    this.authLogin = this.operations.login;
    this.authRegister = this.operations.register;
    this.logger = this.operations.logger;
  }

  /**
   * Auth Login
   *
   * @memberof AuthController
   */
  async login(req, res) {
    try {
      const data = await this.authLogin.execute(req.body);
      return res.status(200).json({ token: data.token });
    } catch (error) {
      this.logger.error(error);
      return res.status(error.statusCode || 400).json(error.errors || { message: error.message });
    }
  }

  async register(req, res) {
    try {
      const user = await this.authRegister.execute(req.body);
      return res.status(200).json(user.toJSON());
    } catch (error) {
      this.logger.error(error);
      return res.status(error.statusCode || 400).json(error.errors || { message: error.message });
    }
  }

  routes() {
    this.router.post('/login', this.login.bind(this));
    this.router.post('/register', this.register.bind(this));
    return this.router;
  }
}

module.exports = AuthController;
