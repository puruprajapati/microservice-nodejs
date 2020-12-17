import mongoose from 'mongoose';
import config from './config/config';

import { app } from './app';

const start = async () => {
  try {
    if (!config.jwtSecretKey) {
      throw new Error('JWT_SECRET_KEY must be defined! ');
    }

    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('conneced to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

start();

app.listen(3000, () => {
  console.log('listening on port 3000');
});
