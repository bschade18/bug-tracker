const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  // check for token

  // 401 status means unauthorized
  if (!token)
    return res.status(401).json({ msg: "no token, authorization denied" });

  try {
    // verify token
    const verified = jwt.verify(token, process.env.SECRET);
    // add user from payload (take user from token?)
    // you can set any request values in your middleware functions
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).json({ msg: "token is not valid" });
  }
}

module.exports = auth;

// now whenever we want a private route
// we can add this middleare as a second parameter in the endpoint
