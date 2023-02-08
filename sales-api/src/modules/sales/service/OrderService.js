import OrderRepository from '../repository/OrderRepository';
import sendMessageToProductStockUpdateQueue from '../../product/rabbitmq/productStockSender';
import OrderException from '../exception/OrderException';
import httpStatus from '../../../config/constants/httpStatus';
import orderStatus from '../status/OrderStatus';
import ProductClient from '../../product/client/ProductClient';

const {
  INTERNAL_SERVER_ERROR,
  SUCCESS,
  BAD_REQUEST,
  NOT_FOUND,
} = httpStatus;
const { PENDING } = orderStatus;

class OrderService {
  async findAll() {
    try {
      const orders = await OrderRepository.findAll();

      if (!orders) {
        throw new OrderException(SUCCESS, 'There are no sales');
      }

      return {
        status: SUCCESS,
        orders,
      };
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findById(req) {
    try {
      const { id } = req.params;
      this.validateInformedId(id);

      const order = await OrderRepository.findById(id);

      if (!order) {
        throw new OrderException(NOT_FOUND, `A order with id ${id} don't exist`);
      }

      return {
        status: SUCCESS,
        order,
      };
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findByProductId(req) {
    try {
      const { id } = req.params;
      this.validateInformedProductId(id);
      const orders = await OrderRepository.findByProductId(id);

      if (!orders.length > 0) {
        throw new OrderException(NOT_FOUND, `There are no sales with product id ${id}`);
      }

      return {
        status: SUCCESS,
        salesIds: orders.map((order) => order.id),
      };
    } catch (error) {
      return {
        status: error.status ? error.status : INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async createOrder(req) {
    try {
      const orderData = req.body;
      const { userId, userName, userEmail } = req;
      const { authorization } = req.headers;

      this.validateOrderData(orderData);
      await this.validateProductsStock(orderData, authorization);

      const order = {
        status: PENDING,
        user: {
          id: userId,
          name: userName,
          email: userEmail,
        },
        products: orderData.products,
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

  validateInformedId(id) {
    if (!id) {
      throw new OrderException(BAD_REQUEST, 'Order id must be informed');
    }
  }

  validateInformedProductId(id) {
    if (!id) {
      throw new OrderException(BAD_REQUEST, 'The product id must be informed');
    }
  }
}

export default new OrderService();
