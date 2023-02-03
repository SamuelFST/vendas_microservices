import OrderRepository from '../repository/OrderRepository';
import sendMessageToProductStockUpdateQueue from '../../product/rabbitmq/productStockSender';
import OrderException from '../exception/OrderException';
import httpStatus from '../../../config/constants/httpStatus';
import orderStatus from '../status/OrderStatus';
import ProductClient from '../../product/client/ProductClient';

const { INTERNAL_SERVER_ERROR, SUCCESS, BAD_REQUEST } = httpStatus;
const { PENDING } = orderStatus;

class OrderService {
  async createOrder(req) {
    try {
      const orderData = req.body;
      const { authUser } = req;
      const { authorization } = req.headers;

      this.validateOrderData(orderData);
      await this.validateProductsStock(orderData, authorization);

      const order = {
        status: PENDING,
        user: authUser,
        products: orderData,
      };

      const createdOrder = await OrderRepository.save(order);
      const message = {
        salesId: createdOrder.id,
        products: createdOrder.products,
      };

      sendMessageToProductStockUpdateQueue(message);

      return {
        status: SUCCESS,
        createdOrder,
      };
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async updateOrder(orderMessage) {
    try {
      const order = JSON.parse(orderMessage);

      if (order.salesId && order.status) {
        const existingOrder = await OrderRepository.findById(order.salesId);

        if (existingOrder && order.status !== existingOrder.status) {
          existingOrder.status = order.status;
          await OrderRepository.save(existingOrder);
        }
      } else {
        console.warn('Order message was incomplete');
      }
    } catch (error) {
      console.error('Error when updating order');
      console.error(error.message);
    }
  }

  validateOrderData(data) {
    if (!data || !data.products) {
      throw new OrderException(BAD_REQUEST, 'The order products must be informed');
    }
  }

  async validateProductsStock(orderData, token) {
    const isStockAvailable = await ProductClient
      .checkProductsStock(orderData.products, token);

    if (!isStockAvailable) {
      throw new OrderException(BAD_REQUEST, 'The stock is out');
    }
  }
}

export default new OrderService();
