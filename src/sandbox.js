window.repl = {}; // fake it til you make it

// var $ = require('jquery');
var _ = require('lodash');
var five = require('johnny-five');
var firmata = require('firmata');
var SerialPort = require('./lib/post-serial');

var Repl = require('johnny-five/lib/repl');
Repl.prototype.initialize = function(callback){
  console.log('repl initialize stub');
  this.emit('ready');
  if(typeof callback === 'function'){
    callback();
  }
};

// window.$ = $;
window._ = _;
window.five = five;
window.firmata = firmata;

var connectedSerial, io;

console.log('launching sandbox');

//browserify should shim stdin
process.stdin = process.stdin || {};
process.stdin.resume = function(){};
process.stdin.setEncoding = function(){};
process.stdin.once = function(){};


function sendCommand(command, payload){
  const msg = {
    command: command,
    payload: payload || {}
  };

  window.parent.postMessage(msg, '*');
}

function log(type, value){
  const payload = {
    value: String(new Date()) + ' : ' + String(value),
    type: type
  };

  sendCommand('log', payload);
}

// TODO: use shimmer
var ogLog = console.log.bind(console);
var ogWarn = console.warn.bind(console);
var ogError = console.error.bind(console);

console.log = function(msg){
  log('log', msg);
  ogLog.apply(null, arguments);
};

console.warn = function(msg){
  log('warn', msg);
  ogWarn.apply(null, arguments);
};

console.error = function(msg){
  log('error', msg);
  ogError.apply(null, arguments);
};

function notify(msg){
  log('notification', msg);
}

window.addEventListener('message', function(event) {
  var data = event.data;
  var command = data && data.command;
  var payload = data && data.payload;
  if(command === 'runScript' && payload) {

    connectedSerial = new SerialPort(window.parent);
    notify('connecting...');

    window.io = io = new firmata.Board(connectedSerial, {repl: false, skipHandshake: false, samplingInterval: 300});
    io.once('ready', function(){
      notify('Connect successful');

      try {
        const f = new Function(payload);
        f();
        notify('Script run successful');
      } catch(e){
        // TODO: should this be a notify?
        console.error(e);
      }
    });
    io.on('error', console.error);
  }
});

sendCommand('ready');
