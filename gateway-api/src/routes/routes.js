import { Router } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
  AUTH_API_URL,
  PRODUCT_API_URL,
  SALES_API_URL,
} from '../config/secrets';

const router = new Router();

router.get('/api/connect', async (req, res) => {
  const authApiResponse = await axios
    .get(`${AUTH_API_URL}api/status`)
    .then((response) => response.status)
    .catch((err) => err.errno);

  const productApiResponse = await axios
    .get(`${PRODUCT_API_URL}api/status`, { headers: { transactionid: uuidv4() } })
    .then((response) => response.status)
    .catch((err) => err.errno);

  const salesApiResponse = await axios
    .get(`${SALES_API_URL}api/status`)
    .then((response) => response.status)
    .catch((err) => err.errno);

  return res.status(200).json({
    status: 200,
    auth_api: authApiResponse === 200 ? 'Up' : 'Down',
    product_api: productApiResponse === 200 ? 'Up' : 'Down',
    sales_api: salesApiResponse === 200 ? 'Up' : 'Down'
  });
});

export default router;
