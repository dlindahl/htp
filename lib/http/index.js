'use strict';

/**
 * Declare module dependencies
 */

var express = require('express'),
    routes = require('./routes'),
    admin = require('./routes/admin'),
    respondTo = require('./middleware/mime_responds').respondTo,
    protect = require('./middleware/authentication');

/**
 * Create Express server
 */

var app = express();

/**
 * Express configuration
 */

app.use(express.json());
app.use(express.urlencoded());
app.use(express.favicon());
app.use(app.router);

/**
 * Public API Routes
 */

app.all('/api/*', respondTo('json'));

app.get('/api/keywords(.:format)', routes.keywords.index);
app.post('/api/suggestions(.:format)', routes.suggestions.create);

/**
 * Admin API Routes
 */

app.all('/admin/*', protect);
app.all('/api/admin/*', protect);

app.get('/api/admin/suggestions(.:format)', admin.suggestions.index);
app.get('/api/admin/metrics(.:format)', admin.metrics.index);


/**
 * Expose the application instance
 */

module.exports = app;