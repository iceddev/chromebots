'use strict';

require('codemirror/mode/javascript/javascript');
require('codemirror/addon/search/searchcursor');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/dialog/dialog.css');
require('codemirror/addon/search/search');
require('codemirror/addon/selection/mark-selection');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/edit/closebrackets');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');

const React = require('react');
const CodeMirror = require('codemirror');
const classnames = require('classnames');

const css = require('./editor.css');

class Editor extends React.Component {

  constructor(...args){
    super(...args);

    this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate(){
    return false;
  }

  componentDidMount(){
    const { value, mode, theme } = this.props;

    const container = React.findDOMNode(this.container);
    const codeEditor = this.codeEditor = CodeMirror(container, {
      value: value,
      mode: mode,
      theme: theme,
      lineNumbers: true,
      autoCloseBrackets: true,
      matchBrackets: true
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
    const { className } = this.props;

    const classes = classnames(css.editor, className);

    return (
      <div {...this.props} ref={(ref) => this.container = ref} className={classes} />
    );
  }
}

module.exports = Editor;
