'use strict';

var htp = require('../'),
    expect = require('expect.js');

describe('htp', function() {
  describe('.app', function() {
    it('returns an Express application', function() {
      expect(htp.app).to.not.be(undefined);
    });
  });

  describe('.authentication', function() {
    var mw = function(req, res, next) {},
        app;

    before(function() {
      htp.authentication(mw);
      app = htp.__createApp__();
    });

    it('adds the specified middleware as the authentication layer', function() {
      expect(app.get('authware')).to.be(mw);
    });
  });
});