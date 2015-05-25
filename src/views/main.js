'use strict';

const _ = require('lodash');
const React = require('react');

const Editor = require('../components/editor/editor');
const Console = require('../components/console/console');

const { inputChange } = require('../actions/editor');

const editorStore = require('../stores/editor');
const consoleStore = require('../stores/console');

const connectToStores = require('../connect-to-stores');

const containerStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
};

const styles = {
  log: {
    color: 'blue'
  },
  warn: {
    color: 'yellow'
  },
  error: {
    color: 'red'
  }
};

function componentizeMessage(message, idx){
  return (
    <div style={styles[message.type]} key={idx}>{message.value}</div>
  );
}

class Main extends React.Component {

  render(){
    const { messages } = this.props;

    return (
      <div style={containerStyle}>
        <Editor {...this.props} onChange={inputChange} />
        <Console>
          {_.map(messages, componentizeMessage)}
        </Console>
      </div>
    );
  }
}

module.exports = connectToStores(Main, {
  getStores({ workspace }){
    editorStore.workspace = workspace;

    return {
      editor: editorStore,
      console: consoleStore
    };
  },

  getPropsFromStores(){
    return _.assign(editorStore.getState(), consoleStore.getState());
  }
});
