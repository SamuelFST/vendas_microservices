import UserRepository from '../repository/UserRepository';
import httpStatus from '../../../config/constants/httpStatus';
import UserException from '../exception/UserException';
import AuthException from '../../auth/exception/AuthException';

class UserService {
  async findByEmail(req) {
    try {
      const { email } = req.params;
      const { userId } = req;

      this.validateRequestData(email);

      const user = await UserRepository.findByEmail(email);

      this.validateUserNotFound(user);
      this.validateAuthenticatedUser(user.id, userId);

      return {
        status: httpStatus.SUCCESS,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async register(req) {
    try {
      const { transactionid, serviceid } = req.headers;

      console.info(
        `Request to POST on register with data ${JSON.stringify(
          req.body,
          ['name', 'email'],
        )} | [transactionID: ${transactionid} | serviceID: ${serviceid}]`,
      );

      const {
        name,
        email,
        password,
      } = req.body;

      this.validateRegisterData(name, email, password);
      const user = await UserRepository.create(name, email, password);

      const response = {
        status: httpStatus.SUCCESS,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      console.info(
        `Response to POST on register with data ${JSON.stringify(
          response,
        )} | [transactionID: ${transactionid} | serviceID: ${serviceid}]`,
      );

      return response;
    } catch (err) {
      return {
        status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  validateRequestData(email) {
    if (!email) {
      throw new UserException(
        httpStatus.BAD_REQUEST,
        'User email was not informed',
      );
    }
  }

  validateUserNotFound(user) {
    if (!user) {
      throw new UserException(
        httpStatus.NOT_FOUND,
        'User was not found',
      );
    }
  }

  validateAuthenticatedUser(userId, authUserId) {
    if (!authUserId || (userId !== authUserId)) {
      throw new AuthException(
        httpStatus.FORBIDDEN,
        'You cannot see this user data',
      );
    }
  }

  validateRegisterData(name, email, password) {
    if (!name || !email || !password) {
      throw new UserException(
        httpStatus.BAD_REQUEST,
        'The user name, email and password are required fields',
      );
    }
  }
}

export default new UserService();
