import AuthService from '../service/AuthService';

class AuthController {
  async authenticate(req, res) {
    const auth = await AuthService.authenticate(req);
    return res.status(auth.status).json(auth);
  }
}

export default new AuthController();
