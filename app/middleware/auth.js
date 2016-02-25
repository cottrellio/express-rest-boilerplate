import jwt from 'jsonwebtoken';

import config from '../config';

const auth = function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers['authorization'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(403)
          .json({
            detail: "You do not have authorization."
          });
      }

      if (decoded) {
        console.log('[AUTH]', true, decoded);
        req.authenticated = decoded;
        next();
      }
    });
  } else {
    return res.status(401)
      .json({
        detail: "You do not have authorization."
      });
  }
};

export default auth;