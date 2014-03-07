'use strict';

var htp = require('../'),
    expect = require('expect.js'),
    mockfs = require('mock-fs');

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

  describe('.geographies', function() {
    var app;

    before(function() {
      mockfs({
        'geo' : {
          'atlantis.geojson': JSON.stringify({
            'type':'FeatureCollection'
          })
        }
      });

      htp.geographies('./geo');
      app = htp.__createApp__();
    });

    after(function() {
      mockfs.restore();
    });

    it('adds each GeoJSON file to the :geographies setting', function() {
      expect(app.get('geographies').length).to.eql(1);
      expect(app.get('geographies')[0].type).to.eql('FeatureCollection');
    });
  });

  describe('.keywords', function() {
    describe('with an array of words', function() {
      var app;

      before(function() {
        htp.keywords(['#foo','#bar']);
        app = htp.__createApp__();
      });

      it('adds them to the list of keywords', function() {
        expect(app.get('keywords')).to.eql(['#foo','#bar']);
      });
    });

    describe('with a list of words', function() {
      var app;

      before(function() {
        htp.keywords('#baz','#qux');
        app = htp.__createApp__();
      });

      it('adds them to the list of keywords', function() {
        expect(app.get('keywords')).to.eql(['#baz','#qux']);
      });
    });
  });
});