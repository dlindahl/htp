'use strict';

/**
 * Server instance (that is lazily required)
 */

var app;

/**
 * Expose the server.
 */

Object.defineProperty(exports, 'app', {
  get: function () {
    return app || (app = require('./http'));
  }
});