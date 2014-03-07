function authentication(req, res, next) {
  var auth = req.app.get('authware');
  if(auth) return auth(req, res, next);
  next();
}

exports = module.exports = authentication;