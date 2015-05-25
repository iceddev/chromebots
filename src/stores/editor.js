'use strict';

const alt = require('../alt');

const { inputChange } = require('../actions/editor');

class EditorStore {

  constructor(){
    this.bindListeners({
      onInputChange: inputChange
    });

    this.state = {
      value: '',
      mode: 'javascript',
      theme: 'monokai'
    };
  }

  onInputChange(value){
    const { workspace } = this.getInstance();

    workspace.updateContent(value);
    this.setState({
      value: workspace.current.deref()
    });
  }
}

EditorStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(EditorStore);
