'use strict';

require('codemirror/mode/javascript/javascript');
require('codemirror/addon/search/searchcursor');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/dialog/dialog.css');
require('codemirror/addon/search/search');
require('codemirror/addon/selection/mark-selection');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');

const React = require('react');
const CodeMirror = require('codemirror');

const styles = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
};

class Editor extends React.Component {

  constructor(...args){
    super(...args);

    this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate(){
    return false;
  }

  componentDidMount(){
    const { value } = this.props;

    const container = React.findDOMNode(this.container);
    const codeEditor = this.codeEditor = CodeMirror(container, {
      value: value,
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true
    });

    codeEditor.on('inputRead', this.onChange);
    codeEditor.on('keyHandled', this.onChange);
  }

  componentWillReceiveProps({ value }){
    const { codeEditor } = this;

    const editorCursor = codeEditor.getCursor();

    if(value !== codeEditor.getValue()){
      codeEditor.setValue(value);
      codeEditor.setCursor(editorCursor);
    }
  }

  onChange(inst){
    const { onChange } = this.props;

    const value = inst.getValue();

    if(typeof onChange === 'function'){
      onChange(value);
    }
  }

  render(){
    return (
      <div ref={(ref) => this.container = ref} style={styles} />
    );
  }
}

module.exports = Editor;
