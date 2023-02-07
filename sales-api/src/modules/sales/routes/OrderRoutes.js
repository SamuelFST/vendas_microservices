import { Router } from 'express';
import OrderController from '../controller/OrderController';

const orderRouter = new Router();

orderRouter.get('/api/orders/:id', OrderController.findById);
orderRouter.post('/api/orders', OrderController.createOrder);

export default orderRouter;
