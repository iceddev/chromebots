'use strict';

const _ = require('lodash');
const serial = require('serialport');
const SerialPort = serial.SerialPort;

const alt = require('../alt');

const { selectPort, refreshDevices, runCode, resetSandbox } = require('../actions/board');

function createSandbox(){
  var sandbox = document.createElement('iframe');
  sandbox.src = 'sandbox.html';
  sandbox.style.display = 'none';
  document.body.appendChild(sandbox);
  return sandbox;
}

class BoardStore {
  constructor(){
    this.bindListeners({
      onPortSelect: selectPort,
      onRefreshDevices: refreshDevices,
      onRun: runCode,
      onResetSandbox: resetSandbox
    });

    this.state = {
      devices: [],
      port: null,
      code: null
    };

    this.sandbox = createSandbox();

    this.onRefreshDevices();


    window.addEventListener('message', (event) => {
      const { contentWindow } = this.sandbox;

      const { command, payload } = event.data;

      if(command !== 'open' && command !== 'ready' && command !== 'write'){
        return;
      }

      if(command === 'open'){
        console.log(event.data);
        return;
      }

      if(command === 'write' && this.connectedSerial && payload){
        this.connectedSerial.write(payload, function(err){
          console.log(arguments);
        });
        return;
      }

      if(command === 'ready'){
        contentWindow.postMessage({
          command: 'runScript',
          payload: this.state.code
        }, '*');
      }
    });
  }

  onRefreshDevices(){
    if(typeof chrome === 'undefined' || typeof chrome.serial === 'undefined'){
      console.warn('No access to Chrome APIs, skipping device listing');
      return;
    }

    serial.list((err, devices) => {
      if(err){
        console.error(err);
        return;
      }

      const devicePorts = _.pluck(devices, 'comName');

      let port;
      if(_.includes(devicePorts, this.state.port)){
        port = this.state.port;
      } else {
        port = _.first(devicePorts);
      }

      this.setState({
        devices: devicePorts,
        port: port
      });
    });
  }

  onPortSelect(port){
    console.log(port);
    this.setState({
      port: port
    });
  }

  onResetSandbox(){
    const { sandbox, connectedSerial } = this;

    if(connectedSerial){
      // connectedSerial.on('close', function(){
      //   setTimeout(startupJ5, 1000);
      // });
      connectedSerial.close();
    }

    sandbox.src = sandbox.src + '';
  }

  onRun(code){
    // reset sandbox JS
    this.onResetSandbox();

    const { contentWindow } = this.sandbox;

    this.connectedSerial = new SerialPort(this.state.port, {
      baudrate: 57600,
      buffersize: 1
    });
    this.connectedSerial.on('data', function(data){
      contentWindow.postMessage({
        command: 'write',
        payload: data
      }, '*');
    });

    this.setState({ code: code });
  }
}

BoardStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(BoardStore);
