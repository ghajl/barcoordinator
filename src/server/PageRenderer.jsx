import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
// import Helmet from 'react-helmet';
import { createMuiTheme } from '@material-ui/core/styles';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
import serialize from 'serialize-javascript';
import { createMemoryHistory } from 'history';
import routes from '../util/routes';
import { configureStore } from '../client/data/store';
import { setUserData } from '../client/data/actions/user';

export default async (location, query, user) => {
  const history = createMemoryHistory();
  const { store } = configureStore(history);
  if (user) {
    store.dispatch(setUserData(user));
  }
  // const currentRoute = matchRoutes(routes, location);
  // const need = currentRoute.map(({ route }) => {
  //   if (route.loadData) {
  //     return route.loadData(store, query);
  //   }
  //   return Promise.resolve(null);
  // });
  // await Promise.all(need);
  const preloadedState = store.getState();

  const context = {};
  const sheets = new ServerStyleSheets();
  // const sheetsManager = new Map();
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#1e90ff' },
      accent: red,
      type: 'light'
    }
  });
  // const generateClassName = createGenerateClassName();

  const reactDom = renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router history={history} location={location} context={context}>
            {renderRoutes(routes)}
          </Router>
        </Provider>
      </ThemeProvider>
    )
  );
  // const headAssets = Helmet.renderStatic();
  const css = sheets.toString();
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <style type="text/css" id="server-side-styles">
      ${css}
    </style>
    <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans|Poiret+One|Roboto" rel="stylesheet">
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPQYCvM0i495Py8i7GV3wn2odaGbwGPPo&libraries=geometry,drawing,places"></script>
    <link href="/dist/style.css" rel="stylesheet">
  </head>
  <body>
    <div id="root">${reactDom}</div>
    <script type="text/javascript" charset="utf-8" >window.__INITIAL_DATA__ = ${serialize(
      preloadedState
    )}</script>
    <script type="text/javascript" charset="utf-8" src="/dist/bundle.js"></script>
  </body>
</html>
`;

  return { html, context };
};
