'use strict';

function isJson(req) {
  return req.is('json') || (/\.(?:geo)*json/.test(req.params[0]));
}

function getFormat(req) {
  if(isJson(req)) return 'json';
  return 'html';
}

function respondTo() {
  var mimetypes = Array.prototype.slice.apply(arguments);

  return function(req, res, next) {
    var format = getFormat(req);
    if(!~mimetypes.indexOf(format)) {
      return res.send(406);
    }
    res.type(format);
    next();
  }
}

module.exports.respondTo = respondTo;