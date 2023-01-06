import UserService from '../service/UserService';

class UserController {
  async findbyEmail(req, res) {
    const user = await UserService.findByEmail(req);
    return res.status(user.status).json(user);
  }
}

export default new UserController();
