'use strict';

const hoek = require('hoek');
const Irken = require('irken');

const app = new Irken();

function onRegister(err){
  hoek.assert(!err, 'Error registering plugins: ' + (err && err.message));
  app.render();
}

const plugins = [
  {
    register: require('holovisor')
  },
  {
    register: require('./plugins/editor'),
    options: {
      initial: ''
    }
  }
];

app.register(plugins, onRegister);
