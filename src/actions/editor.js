'use strict';

const alt = require('../alt');

class EditorActions {
  inputChange(value){
    this.dispatch(value);
  }
}

module.exports = alt.createActions(EditorActions);
