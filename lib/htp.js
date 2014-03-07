'use strict';

/**
 * Server configuration
 */

var config = {};

/**
 * Publically defined configuration options
 */

function authentication(authware) {
  config.authware = authware;
}

exports.authentication = authentication;

/**
 * Server instance (that is lazily required)
 */

var app;

/**
 * Expose the server.
 */

Object.defineProperty(exports, 'app', {
  get: function () {
    if(app) return app;

    app = require('./http');
    app.set('authware', config.authware);

    return app;
  }
});