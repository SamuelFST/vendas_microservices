import dotenv from 'dotenv';
import express from 'express';

import * as db from './src/config/db/initialData.js';

dotenv.config();

const app = express();

db.initialData();

app.get('/api/status', (req, res) => {
  return res.status(200).json({
    service: 'Auth-API',
    status: 'up',
    httpStatus: 200,
  });
});

export default app;
