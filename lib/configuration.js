'use strict';

/**
 * Module dependencies
 */

var fs = require('fs'),
    util = require('util');

/**
 * Configuration prototype
 */

var cfg = {
  settings: {
    geographies: [],
    keywords: []
  }
};

exports = module.exports = cfg;

cfg.set = function(setting, val){
  if(1 === arguments.length) {
    return cfg.settings[setting];
  } else {
    cfg.settings[setting] = val;
    return cfg;
  }
};

cfg.authentication = function authentication(authware) {
  return cfg.set('authware', authware);
}

cfg.geographies = function geographies(dir) {
  var geos = [],
      geo;
  fs.readdirSync(dir).forEach(function(file) {
    geo = fs.readFileSync(dir+'/'+file, 'utf8');
    geos.push(JSON.parse(geo));
  });
  return cfg.set('geographies', geos);
};

cfg.keywords = function keywords(kws) {
  if(!util.isArray(kws)) {
    kws = Array.prototype.slice.call(arguments);
  }
  return cfg.set('keywords', kws);
}
