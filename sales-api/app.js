import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import connect from './src/config/db/mongoConfig';

const app = express();

connect();

app.get('/api/status', (req, res) => {
  return res.status(200).json({
    service: 'Sales-API',
    status: 'up',
    httpStatus: 200,
  });
});

export default app;
