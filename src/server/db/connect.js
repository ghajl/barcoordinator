import mongoose from 'mongoose';
import { isDebug } from '../../config/app';

let config = null;
if (isDebug) {
  config = require('../config').default;
}

export default () => {
  const mongoDB =
    process.env.BARCOORDINATOR_MONGOLAB_URI ||
    config.BARCOORDINATOR_MONGOLAB_URI;
  const mongoOptions = {
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500 // Reconnect every 500ms
  };
  const connect = () => {
    mongoose.connect(mongoDB, mongoOptions, err => {
      if (err) {
        console.log('Error connecting');
      } else {
        console.log('Successfully connected');
      }
    });
  };
  connect();
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', console.error);
  db.on('disconnected', connect);
};
