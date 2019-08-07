import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { renderRoutes } from 'react-router-config';
import red from '@material-ui/core/colors/red';
import configureStore from './data/store';
import routes from '../util/routes';
import '../styles/main.scss';

const preloadedState = window.__INITIAL_DATA__;
delete window.__INITIAL_DATA__;
const store = configureStore(preloadedState);

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
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  </ThemeProvider>,
  rootElement,
  () => {
    const ssStyles = document.getElementById('server-side-styles');
    ssStyles.parentNode.removeChild(ssStyles);
  }
);
