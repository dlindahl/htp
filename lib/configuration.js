'use strict';

/**
 * Module dependencies
 */

var fs = require('fs'),
    util = require('util'),
    avail = require('./util');

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

cfg.get = function(setting, val){
  return cfg.set(setting);
};

cfg.authentication = function authentication(authware) {
  return cfg.set('authware', authware);
}

cfg.geographies = function geographies(dir) {
  var geos = [],
      kws = [],
      geo;
  fs.readdirSync(dir).forEach(function(file) {
    geo = JSON.parse(fs.readFileSync(dir+'/'+file, 'utf8'));
    geos.push(geo);
    kws = kws.concat((geo.properties||{}).keywords);
  });
  var keywords = cfg.get('keywords').concat(kws);
  cfg.set('keywords', avail.unique(keywords));
  return cfg.set('geographies', geos);
};

cfg.keywords = function keywords(kws) {
  if(!util.isArray(kws)) {
    kws = Array.prototype.slice.call(arguments);
  }
  return cfg.set('keywords', kws);
}
