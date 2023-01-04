import { Sequelize } from 'sequelize';

const env = process.env;

const sequelize = new Sequelize(
  env.DATABASE_NAME || 'auth_db',
  env.DATABASE_USER || 'postgres',
  env.DATABASE_PASSWORD || 'postgres',
  {
    host: env.DATABASE_HOST || 'localhost',
    dialect: env.DATABASE_DIALECT || 'postgres',
    quoteIdentifiers: false,
    logging: false,
    define: {
      syncOnAssociation: true,
      timestamps: false,
      underscored: true,
      underscoredAll: true,
      freezeTableName: true,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to postgres')
  })
  .catch((err) => {
    console.error('Unable to connect to postgres database');
    console.error(err);
  });

export default sequelize;
