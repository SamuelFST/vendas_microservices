import httpProxy from 'express-http-proxy';
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import esg from 'express-swagger-generator';

import {
  GATEWAY_PORT,
  AUTH_API_URL,
  PRODUCT_API_URL,
  SALES_API_URL,
} from './src/config/secrets';
import defaultOptions from './swagger.json';
import router from './src/routes/routes';

dotenv.config();

const app = express();

const options = Object.assign(defaultOptions, { basedir: __dirname });
const expressSwagger = esg(app);
expressSwagger(options);

app.use(logger('dev'));
app.use(router);

function selectProxyHost(req, res) {
  if (req.path.startsWith('/api/users') || req.path.startsWith('/api/auth')) {
    return AUTH_API_URL;
  }

  if (req.path.startsWith('/api/categories')
    || req.path.startsWith('/api/suppliers')
    || req.path.startsWith('/api/products')) {
    return PRODUCT_API_URL;
  }

  if (req.path.startsWith('/api/orders')) {
    return SALES_API_URL;
  }
}

app.use((req, res, next) => {
  try {
    httpProxy(selectProxyHost(req))(req, res, next);
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: `No API endpoint found for path ${req.path}`,
    });
  }
});

app.listen(GATEWAY_PORT, () => {
  console.log(`API Gateway running at http://localhost:${GATEWAY_PORT}`);
  console.log(`Docs at http://localhost:${GATEWAY_PORT}/api-docs`);
});
