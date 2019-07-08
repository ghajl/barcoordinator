import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createGenerateClassName } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
import { renderRoutes } from 'react-router-config';
import red from '@material-ui/core/colors/red';
import { createBrowserHistory } from 'history';
import { configureStore } from './data/store';
// import Root from './containers/Root';
// import { basename } from '../config/app';
import routes from '../util/routes';
import '../styles/main.scss';

const history = createBrowserHistory();
const preloadedState = window.__INITIAL_DATA__;
delete window.__INITIAL_DATA__;
const { store } = configureStore(history, preloadedState);

const theme = createMuiTheme({
  palette: {
    primary: { main: '#1e90ff' },
    accent: red,
    type: 'light'
  }
});
const rootElement = document.getElementById('root');
ReactDOM.hydrate(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(routes)}
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  rootElement,
  () => {
    const ssStyles = document.getElementById('server-side-styles');
    ssStyles.parentNode.removeChild(ssStyles);
  }
);
