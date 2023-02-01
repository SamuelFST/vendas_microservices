import amqp from 'amqplib/callback_api';
import queueSpecs from './queue';
import secrets from '../constants/secrets';

function createQueue(connection, queue, routingKey, topic) {
  connection.createChannel((error, channel) => {
    if (error) {
      throw new Error(error);
    }

    channel.assertExchange(topic, 'topic', { durable: true });
    channel.assertQueue(queue, { durable: true });
    channel.bindQueue(queue, topic, routingKey);
  });
}

export default async function connectRabbitMq() {
  amqp.connect(secrets.RABBIT_URL, (error, connection) => {
    if (error) {
      throw new Error(error);
    }

    createQueue(
      connection,
      queueSpecs.PRODUCT_STOCK_UPDATE_QUEUE,
      queueSpecs.PRODUCT_STOCK_UPDATE_ROUTING_KEY,
      queueSpecs.PRODUCT_TOPIC,
    );

    createQueue(
      connection,
      queueSpecs.SALES_CONFIRMATION_QUEUE,
      queueSpecs.SALES_CONFIRMATION_ROUTING_KEY,
      queueSpecs.PRODUCT_TOPIC,
    );

    setTimeout(() => {
      connection.close();
    }, 500);
  });
}
