/**
 * WEBPACK CONFIG
 *
 * Notes on config properties:
 *
 * 'entry'
 * Entry point for the bundle.
 *
 * 'webpack-dev-server'
 * Is a little node.js Express server, which uses the webpack-dev-middleware to serve a webpack bundle.
 * It also has a little runtime which is connected to the server via Socket.IO.
 *
 * 'output'
 * If you pass an array - the modules are loaded on startup. The last one is exported.
 *
 * 'resolve'
 * Array of file extensions used to resolve modules.
 *
 * devtool: 'eval-source-map'
 * http://www.cnblogs.com/Answer1215/p/4312265.html
 * The source map file will only be downloaded if you have source maps enabled and your dev tools open.
 *
 * NoErrorsPlugin()
 * Hot loader is better when used with NoErrorsPlugin and hot/only-dev-server since it eliminates page reloads
 * altogether and recovers after syntax errors.
 *
 * DefinePlugin()
 * Define environment variables
 *
 * ProvidePlugin()
 * Provide browser polyfills for ES6 Promise and fetch which are not supported by all browsers yet
 * and not
 *
 * 'loaders'
 * Webpack uses loaders to support different types of content (e.g. Javascript files, CSS files, images, etc.)
 *
 * 'babel'
 * Transpiles ES6 to ES5, adds support for Webpack's hot module reloading, and
 * bundles Javascript files into Webpack bundle
 *
 * 'style-loader'
 * Autoprefixes and bundles CSS files into Webpack bundle
 */

/* eslint-disable no-var */
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'babel-polyfill',
    './js/index'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.ProvidePlugin({
      'Promise': 'imports?this=>global!exports?global.Promise!es6-promise',
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, 'js'),
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /.css$/,
        loaders: [
          'style',
          'css?sourceMap',
          'autoprefixer-loader?browsers=last 2 versions'
        ],
        include: path.join(__dirname, 'css'),
      }
    ]
  }
};
