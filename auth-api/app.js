import dotenv from 'dotenv';
import express from 'express';

const { env } = process;

import tracing from './src/middlewares/log/tracing';
import initialData from './src/config/db/initialData';
import userRoutes from './src/modules/user/routes/UserRoutes';
import authRoutes from './src/modules/auth/routes/AuthRoutes';
import httpStatus from './src/config/constants/httpStatus';

const CONTAINER_ENV = 'container';

dotenv.config();

const app = express();
const { SUCCESS } = httpStatus;

if (env.NODE_ENV === CONTAINER_ENV) {
  console.info('Waiting for PostgreSQL container to start...');
  setTimeout(() => {
    initialData();
  }, 30000);
} else {
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
