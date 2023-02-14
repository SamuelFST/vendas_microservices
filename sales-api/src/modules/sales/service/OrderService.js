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
  async findAll(req) {
    try {
      const { transactionid, serviceid } = req.headers;

      console.info(
        `Request to GET all orders | [transactionID: ${transactionid} | serviceID: ${serviceid}]`,
      );

      const orders = await OrderRepository.findAll();

      if (!orders) {
        throw new OrderException(SUCCESS, 'There are no sales');
      }

      const response = {
        status: SUCCESS,
        orders,
      };

      console.info(
        `Response to GET all orders with data ${JSON.stringify(response)} | [transactionID: ${transactionid} | serviceID: ${serviceid}]`,
      );

      return response;
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
      const { transactionid, serviceid } = req.headers;

      console.info(
        `Request to GET order by ID ${id} | [transactionID: ${transactionid} | serviceID: ${serviceid}]`,
      );

      this.validateInformedId(id);

      const order = await OrderRepository.findById(id);

      if (!order) {
        throw new OrderException(NOT_FOUND, `A order with id ${id} don't exist`);
      }

      const response = {
        status: SUCCESS,
        order,
      };

      console.info(
        `Response to GET order by ID ${id} with data ${
          JSON.stringify(response)
        } | [transactionID: ${transactionid} | serviceID: ${serviceid}]`,
      );

      return response;
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
      const { transactionid, serviceid } = req.headers;

      console.info(
        `Request to GET orders by product ID ${id} | [transactionID: ${transactionid} | serviceID: ${serviceid}]`,
      );

      this.validateInformedProductId(id);
      const orders = await OrderRepository.findByProductId(id);

      if (!orders.length > 0) {
        throw new OrderException(NOT_FOUND, `There are no sales with product id ${id}`);
      }

      const response = {
        status: SUCCESS,
        salesIds: orders.map((order) => order.id),
      };

      console.info(
        `Response to GET orders by product ID ${id} with data ${
          JSON.stringify(response)
        } | [transactionID: ${transactionid} | serviceID: ${serviceid}]`,
      );

      return response;
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
      const { transactionid, serviceid } = req.headers;

      console.info(
        `Request to POST on createOrder with data ${JSON.stringify(
          orderData,
        )} | [transactionID: ${transactionid} | serviceID: ${serviceid}]`,
      );

      const { userId, userName, userEmail } = req;
      const { authorization } = req.headers;

      this.validateOrderData(orderData);
      await this.validateProductsStock(orderData, authorization, transactionid);

      const order = {
        status: PENDING,
        user: {
          id: userId,
          name: userName,
          email: userEmail,
        },
        products: orderData.products,
        transactionid,
        serviceid,
      };

      const createdOrder = await OrderRepository.save(order);
      const message = {
        salesId: createdOrder.id,
        products: createdOrder.products,
        transactionid,
      };

      sendMessageToProductStockUpdateQueue(message);

      const response = {
        status: SUCCESS,
        createdOrder,
      };

      console.info(
        `Response to POST on createOrder with data ${JSON.stringify(
          response,
        )} | [transactionID: ${transactionid} | serviceID: ${serviceid}]`,
      );

      return response;
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
        console.warn(`Order message was incomplete | [transactionID: ${orderMessage.transactionid}]`);
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

  async validateProductsStock(orderData, token, transactionid) {
    const isStockAvailable = await ProductClient
      .checkProductsStock(orderData.products, token, transactionid);

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
