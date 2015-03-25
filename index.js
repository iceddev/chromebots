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
    register: require('frylord')
  },
  {
    register: require('holovisor')
  }
];

app.register(plugins, onRegister);
