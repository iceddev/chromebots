'use strict';

const alt = require('../alt');

const { log, warn, error, reset } = require('../actions/console');

// TODO: remove these
window.log = log;
window.warn = warn;
window.error = error;

// TODO: on postMessage, dispatch action
window.addEventListener('message', function(event){
  const { command, payload } = event.data;

  if(command !== 'log'){
    return;
  }

  const { type, value } = payload;

  if(type === 'log'){
    log(value);
    return;
  }

  if(type === 'warn'){
    warn(value);
    return;
  }

  if(type === 'error'){
    error(value);
    return;
  }

  if(type === 'notification'){
    // TODO: toasts
    console.log(value);
  }
});

class ConsoleStore {

  constructor(){
    this.bindListeners({
      onLog: log,
      onWarn: warn,
      onError: error,
      onReset: reset
    });

    this.state = {
      messages: []
    };
  }

  makeMessage(type, value){
    return {
      type,
      value
    };
  }

  onLog(msg){
    const { messages } = this.state;

    this.setState({
      messages: messages.concat(this.makeMessage('log', msg))
    });
  }

  onWarn(msg){
    const { messages } = this.state;

    this.setState({
      messages: messages.concat(this.makeMessage('warn', msg))
    });
  }

  onError(msg){
    const { messages } = this.state;

    this.setState({
      messages: messages.concat(this.makeMessage('error', msg))
    });
  }

  onReset(){
    this.setState({
      messages: []
    });
  }
}

ConsoleStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(ConsoleStore);
