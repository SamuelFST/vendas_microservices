import dotenv from 'dotenv';
import express from 'express';

import initialData from './src/config/db/initialData';

dotenv.config();

const app = express();

initialData();

app.get('/api/status', (req, res) => {
  return res.status(200).json({
    service: 'Auth-API',
    status: 'up',
    httpStatus: 200,
  });
});

export default app;
