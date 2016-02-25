import jwt from 'jsonwebtoken';

import User from '../../models/user';
import config from '../../config';

const index = function(req, res, next) {
  res.send('api/');
};

const authenticate = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, function(err, result) {
    if (err) {
      next(err);
      return;
    }

    if (result) {
      const passwordIsValid = result.comparePassword(password);

      if (!passwordIsValid) {
        return res.status(403)
          .json({
            detail: "Authentication failed. Email and/ or password invalid."
          });
      }

      if (passwordIsValid) {
        const token = jwt.sign({
          _id: result._id,
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email
        },
        config.secret,
        {
          expiresIn: '24h'
        });

        return res.status(200)
          .json({
            token: token
          });
      }
    }
  });
};

export { index, authenticate };