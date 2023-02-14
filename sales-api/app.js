import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import connect from './src/config/db/mongoConfig';
import tracing from './src/middlewares/log/tracing';
import createInitialData from './src/config/db/initialData';
import authenticated from './src/middlewares/auth/authenticated';
import connectRabbitMq from './src/config/rabbitmq/rabbitConfig';
import orderRouter from './src/modules/sales/routes/OrderRoutes';

const app = express();
const { env } = process;
const CONTAINER_ENV = 'container';

if (env.NODE_ENV === CONTAINER_ENV) {
  console.info('Waiting for RabbitMQ and MongoDB containers to start...');
  setTimeout(() => {
    connect();
    connectRabbitMq();
  }, 30000);
} else {
  connect();
  connectRabbitMq();
  createInitialData();
}

app.get('/api/status', (req, res) => {
  return res.status(200).json({
    service: 'Sales-API',
    status: 'up',
    httpStatus: 200,
  });
});

app.use(express.json());
app.use(tracing);
app.use(authenticated);
app.use(orderRouter);

export default app;
