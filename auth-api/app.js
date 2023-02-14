import dotenv from 'dotenv';
import express from 'express';

import tracing from './src/middlewares/log/tracing';
import initialData from './src/config/db/initialData';
import userRoutes from './src/modules/user/routes/UserRoutes';
import authRoutes from './src/modules/auth/routes/AuthRoutes';
import httpStatus from './src/config/constants/httpStatus';

dotenv.config();

const app = express();
const { env } = process;
const { SUCCESS } = httpStatus;
const CONTAINER_ENV = 'container';

if (env.NODE_ENV !== CONTAINER_ENV) {
  initialData();
}

app.get('/api/status', (req, res) => {
  return res.status(SUCCESS).json({
    service: 'Auth-API',
    status: 'up',
    httpStatus: 200,
  });
});

app.use(express.json());
app.use(tracing);
app.use(authRoutes);
app.use(userRoutes);

export default app;
