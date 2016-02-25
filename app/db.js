import mongoose from 'mongoose';

import config from './config';

mongoose.connect(config.database);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connected...');
});

export default db;