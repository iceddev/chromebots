'use strict';

const React = require('react');
const classnames = require('classnames');

const css = require('./navbar.css');

class Navbar extends React.Component {

  render(){
    const { className, children } = this.props;

    const classes = classnames(css.navbar, className);

    return (
      <div {...this.props} className={classes}>
        {children}
      </div>
    );
  }
}

module.exports = Navbar;
