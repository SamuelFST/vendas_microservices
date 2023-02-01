import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import connect from './src/config/db/mongoConfig';
import createInitialData from './src/config/db/initialData';
import authenticated from './src/middlewares/auth/authenticated';

const app = express();

connect();
createInitialData();

app.use(authenticated);

app.get('/api/status', (req, res) => {
  return res.status(200).json({
    service: 'Sales-API',
    status: 'up',
    httpStatus: 200,
  });
});

export default app;
