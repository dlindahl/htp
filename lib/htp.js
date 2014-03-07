'use strict';

var extend = require('node.extend'),
    cfg = require('./configuration');

/**
 * Server instance (that is lazily required)
 */

var app;

function createApp() {
  var _app_ = extend({}, require('./http'));

  extend(_app_.settings, cfg.settings);

  return _app_;
}

/**
 * Expose the server.
 */

Object.defineProperty(exports, 'app', {
  get : function() {
    if(app) return app;

    return app = createApp();
  }
});

/**
 * Expose server configuration Api
 */

extend(exports, cfg);

/**
 * Expose application creation helper
 */

exports.__createApp__ = createApp;