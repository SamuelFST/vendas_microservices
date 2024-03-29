import { Sequelize } from 'sequelize';

const { env } = process;

const sequelize = new Sequelize(
  env.DATABASE_NAME || 'auth_db',
  env.DATABASE_USER || 'postgres',
  env.DATABASE_PASSWORD || 'postgres',
  {
    host: env.DATABASE_HOST || 'localhost',
    port: env.DATABASE_PORT || '5432',
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
    pool: {
      acquire: 180000,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to postgres');
  })
  .catch((err) => {
    console.error('Unable to connect to postgres database');
    console.error(err);
  });

export default sequelize;
