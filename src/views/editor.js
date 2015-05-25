'use strict';

const _ = require('lodash');

const Editor = require('../components/editor/editor');

const { inputChange } = require('../actions/editor');

const editorStore = require('../stores/editor');

const connectToStores = require('../connect-to-stores');

module.exports = connectToStores(Editor, {
  getStores({ workspace }){
    editorStore.workspace = workspace;

    return {
      editor: editorStore
    };
  },

  getPropsFromStores(){
    return _.assign(editorStore.getState(), {
      onChange: inputChange
    });
  }
});
