import User from '../../modules/user/model/User';

export default async function initialData() {
  try {
    await User.sync({ force: true });

    await User.create({
      name: 'User',
      email: 'user@mail.com',
      password: '123456',
    });
  } catch (err) {
    console.error(err);
  }
}