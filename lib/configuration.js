'use strict';

/**
 * Configuration prototype
 */

var cfg = { settings:{} };

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
};