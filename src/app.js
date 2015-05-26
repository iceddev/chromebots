'use strict';

const React = require('react');

const Appbar = require('./views/appbar');
const Main = require('./views/main');

const editorStore = require('./stores/editor');

const { inputChange } = require('./actions/editor');

function application(app, opts, done){

  const { workspace } = app;

  editorStore.workspace = workspace;

  app.view('appbar', function(el, cb){
    console.log('appbar render');

    React.render(<Appbar />, el, cb);
  });

  app.view('editor', function(el, cb){
    console.log('editor render');

    React.render(<Main workspace={workspace} />, el, cb);
  });

  inputChange(opts.initial);

  done();
}

module.exports = application;
