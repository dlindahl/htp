'use strict';

var express = require('express'),
    request = require('supertest'),
    expect = require('expect.js'),
    respondTo = require('../lib/http/middleware/mime_responds').respondTo;

describe('middleware', function() {
  describe('.respondTo', function() {
    var app = express();

    app.get('/', respondTo('json'), function(req, res) {
      res.send('ok');
    });

    it('allows configured MIME types', function(done) {
      request(app.listen())
        .get('/')
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if(err) return done(err);
          expect(res.text).to.eql('ok');
          done();
        });
    });

    it('does not allow configured MIME types', function(done) {
      request(app.listen())
        .get('/')
        .set('Content-Type', 'text/html')
        .end(function(err, res) {
          if(err) return done(err);
          expect(res.status).to.eql(406);
          done();
        });
    });
  });
});