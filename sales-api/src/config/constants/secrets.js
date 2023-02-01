const { env } = process;

const secrets = {
  MONGO_URL: env.MONGO_URL ? env.MONGO_URL : 'mongodb://mongoadmin:mongoadmin@localhost:27017/sales_db?authSource=admin',
  SECRET_KEY: env.SECRET_KEY ? env.SECRET_KEY : 'YXV0aC1hcGktc2VjcmV0LWtleS0xMjM0NTY3ODkxMA==',
  RABBIT_URL: env.RABBIT_URL ? env.RABBIT_URL : 'amqp://localhost:5672',
};

export default secrets;
