const { env } = process;

const secrets = {
  MONGO_URL: env.MONGO_URL ? env.MONGO_URL : 'mongodb://localhost:27017/sales_db',
};

export default secrets;
