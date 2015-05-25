'use strict';

const alt = require('../alt');

class ConsoleActions {
  log(msg){
    this.dispatch(msg);
  }
  warn(msg){
    this.dispatch(msg);
  }
  error(msg){
    this.dispatch(msg);
  }
  reset(){
    this.dispatch();
  }
}

module.exports = alt.createActions(ConsoleActions);
