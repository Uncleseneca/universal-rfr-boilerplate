/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { canUseDOM } from 'helpers';
import createHistory from 'history/createBrowserHistory';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import { createSizeAction, listenResize } from 'redux-windowsize';
import App from './components/App';
import configureStore from './configureStore';

const history = createHistory();
const { store } = configureStore(history, window.REDUX_STATE);

const render = (AppComponent) => {
  const root = document.getElementById('root');

  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <AppComponent />
      </Provider>
    </AppContainer>,
    root,
  );
};

if (canUseDOM) {
  store.dispatch(createSizeAction(window));
  listenResize(store, window, 100);
}

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./components/App', () => {
    const DevApp = require('./components/App').default;

    render(DevApp);
  });
}
