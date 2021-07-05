/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import "core-js/stable";
import "regenerator-runtime/runtime";

// Import all the third party stuff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

import throttle from 'lodash/throttle';
import configureStore from './configureStore';
import history from './utils/history';
import { loadState, saveState } from './utils/localStorage';

// Import CSS reset and Global Styles
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Router } from 'react-router';


import theme from "theme";
import { ErrorBoundry } from "containers/componentContainers/ErrorBoundry";

import { Web3ReactProvider } from '@web3-react/core'
import { providers } from "ethers";

// import * as connectors from "utils/connectors";

// PROVIDER SET UP
function getLibrary(provider) {
  const library = new providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}
const persistedState = loadState();
const store = configureStore(persistedState);


store.subscribe(throttle(() => {
  //@ts-ignore
  saveState(store.getState());
}, 1000));

store.subscribe(throttle(() => {
  saveState({
    //@ts-ignore
  });
}, 1000));

const MOUNT_NODE = document.getElementById('app') as HTMLElement;

const render = (Component = App) => {
  ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ErrorBoundry>
          <MuiThemeProvider theme={theme}>
            <Router history={history}>
              <Component />
            </Router>
          </MuiThemeProvider>
        </ErrorBoundry>
      </Provider>
    </Web3ReactProvider>,
    MOUNT_NODE,
  );
};


declare const module: any;
if (module.hot) {
  module.hot.accept(['./containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // tslint:disable-next-line:max-line-length
    const App = require('./containers/App').default; // https://github.com/webpack/webpack-dev-server/issues/100
    render(App);
  });
}

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install();
// }
