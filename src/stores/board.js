'use strict';

const _ = require('lodash');
const serial = require('serialport');

const alt = require('../alt');

const { selectPort, refreshDevices } = require('../actions/board');

class BoardStore {
  constructor(){
    this.bindListeners({
      onPortSelect: selectPort,
      onRefreshDevices: refreshDevices
    });

    this.state = {
      devices: [],
      port: null
    };

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
}

BoardStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(BoardStore);
