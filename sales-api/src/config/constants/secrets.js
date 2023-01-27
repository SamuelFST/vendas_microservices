const { env } = process;

const secrets = {
  MONGO_URL: env.MONGO_URL ? env.MONGO_URL : 'mongodb://mongoadmin:mongoadmin@localhost:27017/sales_db?authSource=admin',
};

export default secrets;
