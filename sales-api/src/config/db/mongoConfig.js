import mongoose from 'mongoose';

import secrets from '../constants/secrets';

export default function connect() {
  mongoose.connect(secrets.MONGO_URL, {
    useNewUrlParser: true,
  });

  mongoose.connection.on('connected', () => {
    console.info('Connected to mongoDB');
  });

  mongoose.connection.on('error', () => {
    console.error('Error on connection with mongoDB');
  });
}
