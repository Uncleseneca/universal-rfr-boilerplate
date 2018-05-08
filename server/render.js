import React from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import { ServerStyleSheet } from 'styled-components';
import flushChunks from 'webpack-flush-chunks';
import configureStore from './configureStore';
import App from '../src/components/App';

export default ({ clientStats }) => async (req, res, next) => {
  const store = await configureStore(req, res);
  if (!store) return; // no store means redirect was already served

  const app = createApp(App, store);
  const sheet = new ServerStyleSheet();
  const appStyled = sheet.collectStyles(app);
  const appString = ReactDOM.renderToString(appStyled);
  const scStyles = sheet.getStyleTags(); // getStyleTags() can only be called after app rendering
  const state = store.getState();
  const stateJson = JSON.stringify(state);
  const chunkNames = flushChunkNames();
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

  console.log('REQUESTED PATH:', req.path);
  console.log('CHUNK NAMES RENDERED', chunkNames);
  const helmet = Helmet.renderStatic();

  return res.send(`<!doctype html>
      <html>
        <head>
           <meta charset="UTF-8">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${styles}
          ${scStyles}
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson};</script>
          <div id="root">${appString}</div>
          ${cssHash}
          <script type='text/javascript' src='/assets/vendor.js'></script>
          ${js}
        </body>
      </html>`);
};

const createApp = (App, store) => (
  <Provider store={store}>
    <App />
  </Provider>
);
