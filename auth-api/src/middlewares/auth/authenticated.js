import jwt from 'jsonwebtoken';
import httpStatus from '../../config/constants/httpStatus';

import AuthException from '../../modules/auth/exception/AuthException';
import secrets from '../../config/constants/secrets';

async function authenticated(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AuthException(
        httpStatus.UNAUTHORIZED,
        'Access token was not informed',
      );
    }

    const [, token] = authorization.split(' ');

    const userData = jwt.verify(token, secrets.SECRET_KEY);

    if (userData) {
      const { id, name, email } = userData.authUser;

      req.userId = id;
      req.userName = name;
      req.userEmail = email;

      return next();
    }
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: err.status ? err.status : httpStatus.UNAUTHORIZED,
      message: err.message,
    });
  }

  throw new AuthException(
    httpStatus.UNAUTHORIZED,
    'Error in token validation',
  );
}

export default authenticated;
