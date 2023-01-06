import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import httpStatus from '../../../config/constants/httpStatus';
import secrets from '../../../config/constants/secrets';
import UserRepository from '../../user/repository/UserRepository';
import UserService from '../../user/service/UserService';
import AuthException from '../exception/AuthException';

class AuthService {
  async authenticate(req) {
    try {
      const { email, password } = req.body;

      this.validateAuthenticationData(email, password);
      const user = await UserRepository.findByEmail(email);

      UserService.validateUserNotFound(user);
      await this.validatePassword(password, user.password_hash);

      const authUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign({ authUser }, secrets.SECRET_KEY, { expiresIn: secrets.EXPIRES_IN });

      return {
        status: httpStatus.SUCCESS,
        token,
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  validateAuthenticationData(email, password) {
    if (!email || !password) {
      throw new AuthException(
        httpStatus.UNAUTHORIZED,
        'E-mail and password must be informed',
      );
    }
  }

  async validatePassword(password, passwordHash) {
    if (!await bcrypt.compare(password, passwordHash)) {
      throw new AuthException(
        httpStatus.UNAUTHORIZED,
        'E-mail and password doesnt match',
      );
    }
  }
}

export default new AuthService();
