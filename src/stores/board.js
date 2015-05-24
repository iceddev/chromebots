'use strict';

const _ = require('lodash');
const serial = require('serialport');

const alt = require('../alt');

const actions = require('../actions/board');

class BoardStore {
  constructor(){
    this.bindListeners({
      onPortSelect: actions.selectPort
    });

    this.state = {
      devices: [],
      port: '/dev/tty.example'
    };

    if(typeof chrome !== 'undefined'){
      return;
    }

    serial.list((err, devices) => {
      if(err){
        console.error(err);
        return;
      }
      console.log(devices);

      const devicePorts = _.pluck(devices, 'comName');

      this.setState({
        devices: devicePorts,
        port: _.first(devicePorts)
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
