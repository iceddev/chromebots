'use strict';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/monokai.css');

var codeMirror = require('codemirror');

var DEFAULT_SCRIPT = '/* \n'
  + ' You have the following variables available to your script:\n'
  + '   five  = The full johnny-five API !\n'
  + '   io    = the firmata instance for the board\n'
  + '   $     = jQuery, because you might already know jQuery\n'
  + '   _     = lodash, because lodash is awesome\n'
  + '*/ \n\n'
  + 'var board = new five.Board({io: io});\n\n'
  + 'board.on(\'ready\', function(){\n'
  + '  // Default to pin 13\n'
  + '  var led = new five.Led(13);\n'
  + '  led.blink();\n'
  + '});';


function editor(app, opts, done){
  app.view('editor', function(el, cb){

    codeMirror(el, {
      value: DEFAULT_SCRIPT,
      mode: 'javascript',
      theme: 'monokai'
    });

    return cb();
  });

  return done();
}

module.exports = editor;
