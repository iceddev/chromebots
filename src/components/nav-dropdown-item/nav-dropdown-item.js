'use strict';

const React = require('react');
const classnames = require('classnames');

const css = require('./nav-dropdown-item.css');

class NavDropdownItem extends React.Component {

  render(){
    const { className, children } = this.props;

    const classes = classnames(css.dropdownItem, className);

    return (
      <div {...this.props} className={classes}>{children}</div>
    );
  }
}

module.exports = NavDropdownItem;
