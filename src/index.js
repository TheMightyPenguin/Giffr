import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import injectGlobalStyles from './GlobalStyles.js'
import AppWrapper from './AppWrapper';

injectGlobalStyles();

ReactDOM.render(
  <AppWrapper>
    <App />
  </AppWrapper>,
  document.getElementById('root')
);

/**
 * STEP 1: Cache the application shell!
 */
serviceWorker.register();
