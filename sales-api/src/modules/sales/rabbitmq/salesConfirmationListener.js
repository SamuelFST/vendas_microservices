import amqp from 'amqplib/callback_api';
import secrets from '../../../config/constants/secrets';
import queueSpecs from '../../../config/rabbitmq/queue';
import OrderService from '../service/OrderService';

const { RABBIT_URL } = secrets;
const { SALES_CONFIRMATION_QUEUE } = queueSpecs;

export default function listenToSalesConfirmationQueue() {
  amqp.connect(RABBIT_URL, (error, connection) => {
    if (error) {
      throw new Error(error);
    }

    console.info('Listening to sales confirmation queue');

    connection.createChannel((err, channel) => {
      if (err) {
        throw new Error(err);
      }

      channel.consume(SALES_CONFIRMATION_QUEUE, (message) => {
        console.info(`Receiving message from queue: ${message.content.toString()}`);
        OrderService.updateOrder(message.content.toString());
      }, {
        noAck: true,
      });
    });
  });
}
