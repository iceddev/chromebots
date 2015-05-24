'use strict';

const React = require('react');
const classnames = require('classnames');

const css = require('./nav-button.css');

class NavButton extends React.Component {

  render(){
    const { className, children } = this.props;

    const classes = classnames(css.button, className);

    return (
      <button {...this.props} className={classes}>{children}</button>
    );
  }
}

module.exports = NavButton;
