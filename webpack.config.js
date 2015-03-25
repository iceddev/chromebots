'use strict';

var path = require('path');

var shouldWatch = (process.argv.indexOf('--watch') !== -1);

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional=runtime'
      }
    ]
  },
  resolveLoader: {
    // support loaders against linked modules
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    // support aliases against linked modules
    root: path.join(__dirname, 'node_modules'),
    alias: {
      fs: 'browserify-fs'
    }
  },
  // crash on invalid bundle
  bail: true,
  watch: shouldWatch
};
