'use strict';

const alt = require('../alt');

class BoardActions {
  selectPort(port, oldPort){
    this.dispatch(port);
  }
}

module.exports = alt.createActions(BoardActions);
