const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ msg: 'no token, authorization denied' });

  try {
    // verify token
    const verified = jwt.verify(token, process.env.SECRET);
    // add user from payload (take user from token?)

    console.log(verified);

    // you can set any request values in your middleware functions
    req.user = verified;
    next();
  } catch (e) {
    res.status(401).json({ msg: 'token is not valid' });
  }
}

module.exports = auth;
