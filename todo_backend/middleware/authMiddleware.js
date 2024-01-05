const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
  }

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Unauthorized', message: 'Token has expired' });
      } else {
        return res.status(403).json({ error: 'Forbidden', message: 'Failed to authenticate token' });
      }
    }

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateJWT,
};

