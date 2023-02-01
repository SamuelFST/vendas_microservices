import amqp from 'amqplib/callback_api';
import secrets from '../../../config/constants/secrets';
import queueSpecs from '../../../config/rabbitmq/queue';

const { RABBIT_URL } = secrets;
const { PRODUCT_TOPIC, PRODUCT_STOCK_UPDATE_ROUTING_KEY } = queueSpecs;

export default function sendMessageToProductStockUpdateQueue(message) {
  amqp.connect(RABBIT_URL, (error, connection) => {
    if (error) {
      throw new Error(error);
    }

    connection.createChannel((err, channel) => {
      if (err) {
        throw new Error(err);
      }

      const stringifyMessage = JSON.stringify(message);
      console.info(`Sending message to product update stock: ${stringifyMessage}`);

      channel.publish(
        PRODUCT_TOPIC,
        PRODUCT_STOCK_UPDATE_ROUTING_KEY,
        Buffer.from(stringifyMessage),
      );

      console.info('Message sent successfully');
    });
  });
}
