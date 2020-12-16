import dev from './dev';
import prod from './prod';

let config: any = {}; // or we can use config.mongoURI! for saying typescript that we have verified manually

if (process.env.NODE_ENV === 'production') {
  config = prod;
} else {
  config = dev;
}

export default config;
