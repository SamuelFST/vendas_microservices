import dotenv from 'dotenv';
import express from 'express';

import initialData from './src/config/db/initialData';
import userRoutes from './src/modules/user/routes/UserRoutes';
import authRoutes from './src/modules/auth/routes/AuthRoutes';

dotenv.config();

const app = express();

initialData();

app.use(express.json());

app.use(authRoutes);
app.use(userRoutes);

app.get('/api/status', (req, res) => {
  return res.status(200).json({
    service: 'Auth-API',
    status: 'up',
    httpStatus: 200,
  });
});

export default app;
