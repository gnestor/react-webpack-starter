/* eslint-disable no-var */

require('babel-core/register');
var jsdom = require('jsdom').jsdom;

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

require.extensions['.css'] = function () {
  return false
};
