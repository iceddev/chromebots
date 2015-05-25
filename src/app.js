'use strict';

const React = require('react');

const Appbar = require('./views/appbar');
const Editor = require('./views/editor');

function application(app, opts, done){

  const { workspace } = app;

  app.view('appbar', function(el, cb){
    console.log('appbar render');

    React.render(<Appbar />, el, cb);
  });

  app.view('editor', function(el, cb){
    console.log('editor render');

    React.render(<Editor workspace={workspace} />, el, cb);
  });

  workspace.updateContent(opts.initial, done);
}

module.exports = application;
