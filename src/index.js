import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import store from './Store/store';
import { Provider } from 'react-redux';

const GA_ID = process.env.REACT_APP_GA_ID;
if (GA_ID) {
  ReactGA.initialize(GA_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const GTM_ID = process.env.REACT_APP_GTM_ID;
const tagManagerArgs = {
  gtmId: GTM_ID,
};
TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
