import { v4 as uuidv4 } from 'uuid';
import httpStatus from '../../config/constants/httpStatus';

const { BAD_REQUEST } = httpStatus;

export default (req, res, next) => {
  const { transactionid } = req.headers;

  if (!transactionid) {
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: 'The transactionid header is required',
    });
  }

  req.headers.serviceid = uuidv4();
  return next();
};
