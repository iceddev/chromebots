'use strict';

var path = require('path');

var webpack = require('webpack');

var shouldWatch = (process.argv.indexOf('--watch') !== -1);
var moduleLocation = path.join(__dirname, 'node_modules');

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional=runtime'
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/package.json/, /levelup/)
  ],
  resolveLoader: {
    // support loaders against linked modules
    root: moduleLocation
  },
  resolve: {
    // support aliases against linked modules
    root: moduleLocation,
    alias: {
      fs: 'browserify-fs'
    }
  },
  // crash on invalid bundle
  bail: true,
  watch: shouldWatch
};
