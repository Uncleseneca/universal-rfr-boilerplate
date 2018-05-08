import 'babel-polyfill';

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import clientConfig from '../webpack/client.dev';
import serverConfig from '../webpack/server.dev';

const hook = require('css-modules-require-hook');

const path = require('path');
const favicon = require('serve-favicon');

hook({
  generateScopedName: '[name]__[local]--[hash:base64:5]',
});

const DEV = process.env.NODE_ENV === 'development';
const publicPath = clientConfig.output.publicPath;
const outputPath = path.resolve(clientConfig.output.path, '..');
const app = express();

// UNIVERSAL HMR + STATS HANDLING GOODNESS:

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
  });
  app.use((req, res, next) => {
    console.log(req.originalUrl);
    console.log(outputPath);
    return next();
  });

  app.use(
    /* [publicPath, '.*\.(ico|png|svg|css|js)'], */ express.static(outputPath));
  app.use(webpackDevMiddleware(multiCompiler, { publicPath }));

  app.use(webpackHotMiddleware(clientCompiler));
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath },
    }));
  // app.use(favicon(outputPath +  '/favicon.ico'));
} else {
  const clientStats = require('../buildClient/public/assets/stats.json'); // eslint-disable-line import/no-unresolved
  const serverRender = require('../buildServer/main.js').default; // eslint-disable-line import/no-unresolved

  app.use(express.static(outputPath));
  app.use(serverRender({ clientStats, outputPath }));
}

app.listen(3332, () => {
  console.log('Listening @ http://localhost:3332/');
});
