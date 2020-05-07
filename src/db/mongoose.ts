import mongoose from 'mongoose';

import env from '../constants/env';

const DEFAULT_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 1,
};

const createDBConnection = (): Promise<void> => (
  new Promise((resolve, reject) => {
    mongoose.connect(env.MONGO_DB_URL, DEFAULT_OPTIONS);
    mongoose.connection
      .once('open', () => { resolve(); })
      .on('error', (error) => { reject(error); });
  })
);

export default createDBConnection;
