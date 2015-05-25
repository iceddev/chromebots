'use strict';

const React = require('react');
const classnames = require('classnames');

const css = require('./console.css');

class Console extends React.Component {

  componentDidUpdate(){
    const el = React.findDOMNode(this);
    el.scrollTop = el.scrollHeight;
  }

  render(){
    const { className, children } = this.props;

    const classes = classnames(css.console, className);

    return (
      <pre className={classes}>
        {children}
      </pre>
    );
  }
}

module.exports = Console;
