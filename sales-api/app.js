import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import connect from './src/config/db/mongoConfig';
import createInitialData from './src/config/db/initialData';
import authenticated from './src/middlewares/auth/authenticated';
import connectRabbitMq from './src/config/rabbitmq/rabbitConfig';
import orderRouter from './src/modules/sales/routes/OrderRoutes';

const app = express();

connect();
createInitialData();
connectRabbitMq();

app.get('/api/status', (req, res) => {
  return res.status(200).json({
    service: 'Sales-API',
    status: 'up',
    httpStatus: 200,
  });
});

app.use(express.json());
app.use(authenticated);
app.use(orderRouter);

export default app;
