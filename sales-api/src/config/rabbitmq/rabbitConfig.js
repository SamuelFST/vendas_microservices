import amqp from 'amqplib/callback_api';
import queueSpecs from './queue';
import secrets from '../constants/secrets';
import listenToSalesConfirmationQueue from '../../modules/sales/rabbitmq/salesConfirmationListener';

async function createQueue(connection, queue, routingKey, topic) {
  await connection.createChannel((error, channel) => {
    if (error) {
      throw new Error(error);
    }

    channel.assertExchange(topic, 'topic', { durable: true });
    channel.assertQueue(queue, { durable: true });
    channel.bindQueue(queue, topic, routingKey);
  });
}

async function connectRabbitMqAndCreateQueues() {
  amqp.connect(secrets.RABBIT_URL, { timeout: 180000 }, (error, connection) => {
    if (error) {
      throw new Error(error);
    }

    console.info('Starting RabbitMq');

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

    console.info('Queues and topics created');

    setTimeout(() => {
      connection.close();
    }, 2000);
  });

  setTimeout(() => {
    listenToSalesConfirmationQueue();
  }, 2000);
}

export default async function connectRabbitMq() {
  const env = process.env.NODE_ENV;
  console.log('env: ', env);
  if (env === 'container') {
    console.info('Waiting for rabbitMq start');
    setInterval(() => {
      connectRabbitMqAndCreateQueues();
    }, 30000);
  } else {
    connectRabbitMqAndCreateQueues();
  }
}
