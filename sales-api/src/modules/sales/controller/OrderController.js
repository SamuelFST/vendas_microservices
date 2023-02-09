import OrderService from '../service/OrderService';

class OrderController {
  async findAll(req, res) {
    const orders = await OrderService.findAll(req);
    return res.status(orders.status).json(orders);
  }

  async findById(req, res) {
    const order = await OrderService.findById(req);
    return res.status(order.status).json(order);
  }

  async findByProductId(req, res) {
    const orders = await OrderService.findByProductId(req);
    return res.status(orders.status).json(orders);
  }

  async createOrder(req, res) {
    const order = await OrderService.createOrder(req);
    return res.status(order.status).json(order);
  }
}

export default new OrderController();
