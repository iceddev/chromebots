'use strict';

const _ = require('lodash');
const React = require('react');
const classnames = require('classnames');

const css = require('./icon.css');

class Icon extends React.Component {

  render(){
    const { className, glyph } = this.props;

    const title = _.startCase(glyph);
    const classes = classnames('oi', css.icon, className);

    return (
      <span {...this.props} data-glyph={glyph} className={classes} title={title} aria-hidden="true" />
    );
  }
}

module.exports = Icon;
