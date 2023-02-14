const { env } = process;
import User from '../../modules/user/model/User';

const CONTAINER_ENV = 'container';

export default async function initialData() {
  try {
    if (env.NODE_ENV === CONTAINER_ENV) {
      await User.sync({ force: true });
    } else {
      await User.sync({ force: true });

      await User.create({
        name: 'User',
        email: 'user@mail.com',
        password: '123456',
      });

      await User.create({
        name: 'User2',
        email: 'user2@mail.com',
        password: '123456',
      });

      console.info('auth-db initial data inserted');
    }
  } catch (err) {
    console.error(err);
  }
}
