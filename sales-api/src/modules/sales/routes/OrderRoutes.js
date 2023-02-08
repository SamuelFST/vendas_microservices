import { Router } from 'express';
import OrderController from '../controller/OrderController';

const orderRouter = new Router();

orderRouter.get('/api/orders', OrderController.findAll);
orderRouter.get('/api/orders/:id', OrderController.findById);
orderRouter.get('/api/orders/products/:id', OrderController.findByProductId);
orderRouter.post('/api/orders', OrderController.createOrder);

export default orderRouter;
