import * as dotenv from 'dotenv';

dotenv.config();

export default {
  mongoURI: process.env.MONGO_URI,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  needSecureEnv: true,
};
