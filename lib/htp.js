'use strict';

/**
 * Declare module dependencies
 */

var express = require('express');

/**
 * Server instance (that is lazily required)
 */

var app;

/**
 * Server constructor
 */

function createApp() {
  return express();
}

/**
 * Expose the server.
 */

Object.defineProperty(exports, 'app', {
  get: function () {
    return app || (app = createApp());
  }
});