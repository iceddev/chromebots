'use strict';

const Irken = require('irken');

let app = new Irken();

const initial = `
/*
 You have the following variables availaible to your script:
   five  = The full johnny-five API !
   io    = the firmata instance for the board
   $     = jQuery, because you might already know jQuery
   _     = lodash, because lodash is awesome
*/

var board = new five.Board({io: io});

board.on('ready', function(){
  // Default to pin 13
  var led = new five.Led(13);
  led.blink();
});
`;

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
    register: require('./app'),
    options: {
      initial: initial
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
