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
}

export default new UserService();
