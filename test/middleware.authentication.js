'use strict';

var express = require('express'),
    request = require('supertest'),
    expect = require('expect.js'),
    protect = require('../lib/http/middleware/authentication');

describe('middleware', function() {
  describe('authentication', function() {
    describe('with an :authware defined', function() {
      var app = express();

      app.set('authware', express.basicAuth('user','pass'));

      app.get('/', protect, function(req, res) {
        res.send('ok');
      });

      it('protects the resource', function(done) {
        request(app.listen())
          .get('/')
          .end(function(err, res) {
            if(err) return done(err);
            expect(res.text).to.eql('Unauthorized');
            done();
          });
      });
    });

    describe('without an :authware defined', function() {
      var app = express();

      app.get('/', protect, function(req, res) {
        res.send('ok');
      });

      it('does not protect the resource', function(done) {
        request(app.listen())
          .get('/')
          .end(function(err, res) {
            if(err) return done(err);
            expect(res.text).to.eql('ok');
            done();
          });
      });
    });
  });
});