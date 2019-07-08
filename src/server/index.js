import express from 'express';
import passport from 'passport';
import createApp from './PageRenderer';
import { connect as connectDb } from './db';
import initPassport from './init/passport';
import initExpress from './init/express';
import initRoutes from './init/routes';

const app = express();

connectDb();

initPassport(passport);

initExpress(app, passport);

initRoutes(app, passport);

app.get('*', async (req, res) => {
  const { html, context } = await createApp(req.path, req.query, req.user);
  const { url = null } = context;
  if (url) {
    res.writeHead(302, {
      Location: url
    });
    res.end();
  } else {
    res.send(html);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app listening on port ${port}\n`);
});
