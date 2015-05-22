'use strict';

const StyleSheet = require('react-style');

const styles = {
  appbar: {
    normalAppBarStyle: StyleSheet.create({
      backgroundColor: '#f6dd25'
    })
  },
  logo: {
    boxSizing: 'border-box',
    height: '100%',
    position: 'absolute',
    right: 0,
    padding: 8
  }
};

module.exports = styles;
