import bcrypt from 'bcrypt';
import User from '../../modules/user/model/User.js';

export async function initialData() {
  try {
    await User.sync({ force: true });

    const password = await bcrypt.hash('123456', 10);

    await User.create({
      name: 'User',
      email: 'user@mail.com',
      password,
    });
  } catch (err) {
    console.error(err);
  }
}
