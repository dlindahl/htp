'use strict';

var htp = require('../'),
    assert = require('assert');

describe('htp', function() {
  describe('.app', function() {
    it('returns an Express application', function() {
      assert(htp.app);
    });
  });
});