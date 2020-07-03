const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ msg: 'no token, authorization denied' });

  try {
    const verified = jwt.verify(token, process.env.SECRET);

    req.user = verified;
    next();
  } catch (e) {
    res.status(401).json({ msg: 'token is not valid' });
  }
}

module.exports = auth;
