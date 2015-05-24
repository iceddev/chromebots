'use strict';

const _ = require('lodash');
const React = require('react');

const Icon = require('../components/icon/icon');
const Navbar = require('../components/navbar/navbar');
const NavButton = require('../components/nav-button/nav-button');
const NavDropdown = require('../components/nav-dropdown/nav-dropdown');
const NavDropdownItem = require('../components/nav-dropdown-item/nav-dropdown-item');

const { selectPort } = require('../actions/board');

const boardStore = require('../stores/board');

const connectToStores = require('../connect-to-stores');

const boardStyles = {
  marginLeft: 'auto'
};

function componentizeDevice(device){
  return (
    <NavDropdownItem value={device}>{device}</NavDropdownItem>
  );
}

class Appbar extends React.Component {

  render(){
    const { port, devices } = this.props;

    return (
      <Navbar>
        <img src="/assets/logo.png" />
        <NavDropdown style={boardStyles} onValueChange={selectPort} value={port}>
          {_.map(devices, componentizeDevice)}
        </NavDropdown>
        <NavButton>
          Stop <Icon glyph="media-stop" />
        </NavButton>
        <NavButton>
          Run <Icon glyph="media-play" />
        </NavButton>
      </Navbar>
    );
  }
}

module.exports = connectToStores(Appbar, {
  getStores(){
    return {
      board: boardStore
    };
  },

  getPropsFromStores(){
    return boardStore.getState();
  }
});
