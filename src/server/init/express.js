import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import connectMongo from 'connect-mongo';
import { isDebug, isProduction } from '../../config/app';

let config = null;
// if (isDebug) {
//   config = require('../config').default;
// }

export default (app, passport) => {
  if (isProduction) {
    app.use(helmet({ noCache: true }));
  }

  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const MongoStore = connectMongo(session);
  const mongoDB =
    process.env.BARCOORDINATOR_MONGOLAB_URI ||
    config.BARCOORDINATOR_MONGOLAB_URI;

  const sessionSecret =
    process.env.BARCOORDINATOR_SESSION_SECRET2 ||
    config.BARCOORDINATOR_SESSION_SECRET2;
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
      store: new MongoStore({
        url: mongoDB,
        autoReconnect: true
      })
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const rootDir = process.cwd();

  app.get('/privacypolicy', (req, res) => {
    res.sendFile(`${rootDir}/public/privacypolicy.htm`);
  });
  app.use('/public', express.static(`${rootDir}/public`));
  app.use('/dist', express.static(`${rootDir}/dist`));
};
