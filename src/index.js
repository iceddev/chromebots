'use strict';

const Irken = require('irken');

let app = new Irken();

var plugins = [
  {
    register: require('frylord'),
    options: {
      useTempFiles: true
    }
  },
  {
    register: require('snacks')
  },
  {
    register: require('holovisor')
  },
  {
    register: require('skrim')
  },
  {
    register: require('iggins')
  },
  {
    register: require('./app')
  },
  {
    register: require('../plugins/editor'),
    options: {
      initial: ''
    }
  },
  {
    register: require('../plugins/sidebar'),
    options: {
      defaultProject: 'new-project'
    }
  }
];

app.register(plugins, function(err){
  console.log('registered', err, app);
  app.render(function(err){
    console.log('rendered', err);
  });
});

// for debugging purposes
window.app = app;
