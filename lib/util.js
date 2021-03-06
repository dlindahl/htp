'use strict';

var fs = require('fs'),
    path = require('path');

/**
 * Automatically exports every file in a directory
 */

function autoExport(dir, exports) {
  fs.readdirSync(dir).forEach(function(file) {
    if(file === 'index.js') return;
    var ext = path.extname(file);
    if(ext !== '.js') return;

    var name = path.basename(file, ext);
    exports[name] = require(dir+'/'+name);
  });
  return exports;
}

/**
 * Expunge duplicate values from an Array
 */

function unique(value) {
  return value.reduce(function(arr, item) {
    if(!~arr.indexOf(item)) arr.push(item);
    return arr;
  }, []);
}

/**
 * Define Public Api
 */

module.exports.autoExport = autoExport;
module.exports.unique = unique;