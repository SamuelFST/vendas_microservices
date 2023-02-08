import Order from '../model/Order';

class OrderRepository {
  async findAll() {
    try {
      return await Order.find();
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async findById(id) {
    try {
      return await Order.findById(id);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async findByProductId(id) {
    try {
      return await Order.find({ 'products.productId': Number(id) });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async save(order) {
    try {
      return await Order.create(order);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
}

export default new OrderRepository();
