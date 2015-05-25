'use strict';

const _ = require('lodash');
const serial = require('serialport');

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
      port: null
    };

    this.sandbox = createSandbox();

    this.onRefreshDevices();
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
    const { sandbox } = this;

    sandbox.src = sandbox.src + '';
  }

  onRun(code){
    // reset sandbox JS
    this.onResetSandbox();

    const { contentWindow } = this.sandbox;

    setTimeout(function(){
      contentWindow.postMessage({
        command: 'runScript',
        payload: code
      }, '*');
    }, 100);
  }
}

BoardStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(BoardStore);
