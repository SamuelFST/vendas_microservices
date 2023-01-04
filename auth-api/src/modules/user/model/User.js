import { Sequelize } from 'sequelize';
import sequelize from '../../../config/db/dbConfig.js';

const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid e-mail',
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {},
);

export default User;
