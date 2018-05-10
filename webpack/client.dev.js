const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const context = path.resolve(__dirname, '../src');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  // devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../buildClient/public/assets'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            resourceQuery: /^\?raw$/,
            use: ExtractCssChunks.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    modules: false,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                  },
                },
                {
                  loader: 'postcss-loader',
                },
              ],
            }),
          },
          {
            test: /\.css$/,
            use: ExtractCssChunks.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]--[hash:base64:5]',
                  },
                },
                {
                  loader: 'postcss-loader',
                },
              ],
            }),
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|mp4|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      // {
      //   test: /\.(svg)$/,
      //   use: [
      //     {
      //       loader: 'svg-url-loader',
      //       options: {
      //         noquotes: true
      //       },
      //     },
      //   ],
      // },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      _: path.resolve(context),
      components: path.resolve(context, 'components'),
      reducers: path.resolve(context, 'reducers'),
      actions: path.resolve(context, 'actions'),
      helpers: path.resolve(context, 'helpers'),
      assets: path.resolve(context, 'assets'),
      selectors: path.resolve(context, 'selectors'),
      api: path.resolve(context, 'api'),
      icons: path.resolve(context, 'components/modules/icons'),
    },
  },

  plugins: [
    new WriteFilePlugin(), // used so you can see what chunks are produced in dev
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity,
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new CopyWebpackPlugin([
      // Copy directory contents to {output}/to/directory/
      // { from: 'from/directory', to: 'to/directory' },
      {
        from: path.resolve(context, 'public'),
        to: path.resolve(__dirname, '../buildClient/public'),
      },
    ]),

    new AutoDllPlugin({
      context: path.join(__dirname, '..'),
      filename: '[name].js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'history/createBrowserHistory',
          'transition-group',
          'redux-first-router',
          'redux-first-router-link',
          'babel-polyfill',
          'redux-devtools-extension/logOnlyInProduction',
        ],
      },
    }),
  ],
};
