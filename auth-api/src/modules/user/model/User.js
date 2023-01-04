import { Sequelize } from 'sequelize';
import sequelize from '../../../config/db/dbConfig.js';
import bcrypt from 'bcrypt';

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
    password_hash: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.VIRTUAL,
      allowNull: false,
    }
  },
  {},
);

User.addHook('beforeSave', async (user) => {
  user.password_hash = await bcrypt.hash(user.password, 10);
});

export default User;
