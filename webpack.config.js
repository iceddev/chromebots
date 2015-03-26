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
        test: /\.css$/,
        loader: 'style-loader!css-loader'
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
    root: path.join(__dirname, 'node_modules')
  },
  // crash on invalid bundle
  bail: true,
  watch: shouldWatch
};
