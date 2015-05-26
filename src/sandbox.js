'use strict';

const _ = window._ = require('lodash');
const five = window.five = require('johnny-five');
const firmata = window.firmata = require('firmata');
const shimmer = require('shimmer');

var SerialPort = require('./lib/post-serial');

var Repl = require('johnny-five/lib/repl');
Repl.prototype.initialize = function(callback){
  this.emit('ready');
  if(typeof callback === 'function'){
    callback();
  }
};

var connectedSerial, io;

console.log('launching sandbox');

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

shimmer.wrap(console, 'log', function(original){
  return function(msg){
    log('log', msg);
    return original.apply(this, arguments);
  };
});
shimmer.wrap(console, 'warn', function(original){
  return function(msg){
    log('warn', msg);
    return original.apply(this, arguments);
  };
});
shimmer.wrap(console, 'error', function(original){
  return function(msg){
    log('error', msg);
    return original.apply(this, arguments);
  };
});

function notify(msg){
  log('notification', msg);
}

window.addEventListener('message', function(event) {
  const { command, payload } = event.data;
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
