'use strict';

const React = require('react');
const classnames = require('classnames');
const controllable = require('react-controllables');

const Icon = require('../icon/icon');

const css = require('./nav-dropdown.css');

class NavDropdown extends React.Component {

  constructor(...args){
    super(...args);

    this.onClick = this.onClick.bind(this);
  }

  onClick(evt){
    const { open, onOpenChange, onClick } = this.props;

    if(typeof onOpenChange === 'function'){
      onOpenChange(!open);
    }

    if(typeof onClick === 'function'){
      onClick(evt);
    }
  }

  renderSelected(){
    const { value, children } = this.props;

    let component;
    React.Children.forEach(children, (child) => {
      if(child.props.value === value){
        component = child;
      }
    });

    if(!component){
      component = children[0];
    }

    // if we hit this, have no children
    if(!component){
      return (
        <div className={css.selected}>
          <Icon glyph="chevron-bottom" className={css.icon} />
        </div>
      );
    }

    return (
      <div className={css.selected}>
        {component.props.children}
        <Icon glyph="chevron-bottom" className={css.icon} />
      </div>
    );
  }

  renderDropdown(){
    const { onValueChange, children } = this.props;

    const menuItems = React.Children.map(children, (child) => {
      const onClick = child.props.onClick;

      function onChange(evt){
        if(typeof onValueChange === 'function'){
          console.log(child.props.value);
          onValueChange(child.props.value);
        }

        if(typeof onClick === 'function'){
          onClick(evt);
        }
      }

      return React.cloneElement(child, {
        onClick: onChange
      });
    });

    return (
      <div className={css.menu}>
        {menuItems}
      </div>
    );
  }

  render(){
    const { open, className } = this.props;

    const classes = classnames(css.dropdown, { [css.open]: open }, className);

    return (
      <div {...this.props} className={classes} onClick={this.onClick}>
        {this.renderDropdown()}
        {this.renderSelected()}
      </div>
    );
  }
}

NavDropdown.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onOpenChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string.isRequired,
  onValueChange: React.PropTypes.func.isRequired
};
NavDropdown.defaultProps = {
  open: false,
  value: ''
};

module.exports = controllable(NavDropdown, ['value', 'open']);
