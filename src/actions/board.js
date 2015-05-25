'use strict';

const alt = require('../alt');

class BoardActions {
  selectPort(port, oldPort){
    this.dispatch(port);
  }
  refreshDevices(){
    this.dispatch();
  }
}

module.exports = alt.createActions(BoardActions);
