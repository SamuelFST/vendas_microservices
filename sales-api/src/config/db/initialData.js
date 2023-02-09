import { v4 as uuidv4 } from 'uuid';
import Order from '../../modules/sales/model/Order';

export default async function createInitialData() {
  await Order.collection.drop();

  await Order.create({
    products: [
      {
        productId: 16,
        quantity: 5,
      },
      {
        productId: 12,
        quantity: 3,
      },
      {
        productId: 15,
        quantity: 1,
      },
    ],
    user: {
      id: 7,
      name: 'User admin',
      email: 'admin@mail.com',
    },
    status: 'APPROVED',
    transactionid: uuidv4(),
    serviceid: uuidv4(),
  });

  await Order.create({
    products: [
      {
        productId: 12,
        quantity: 2,
      },
      {
        productId: 16,
        quantity: 7,
      },
    ],
    user: {
      id: 8,
      name: 'User admin 2',
      email: 'admin2@mail.com',
    },
    status: 'REJECTED',
    transactionid: uuidv4(),
    serviceid: uuidv4(),
  });
}
