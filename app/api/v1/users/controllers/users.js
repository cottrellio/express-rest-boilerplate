import User from '../../../../models/user';

const list = function(req, res, next) {
  // Find Users.
  User.find({}, function(err, results) {
    // Handle err.
    if (err) {
      return next(err);
    }

    // Handle results.
    if (results) {
      return res.status(200)
        .json(results);
    }
  });
};

const post = function(req, res, next) {
  // Properties.
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;

  // Create User.
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    is_admin: false,
    subscription: 'free'
  });

  // Save User.
  user.save(function(err, result) {
    if (err) {
      next(err);
      return;
    }

    if (result) {
      return res.status(200)
        .json({
          user: result
        });
    }
  });
};

const get = function(req, res, next) {
  return res.status(200)
    .json({
      user: req.object
    });
};

const patch = function(req, res, next) {
  const user = req.object;

  // Set properties.
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.email = req.body.email;
  user.updated_at = Date.now();

  // Save
  user.save(function(err, result) {
    // Handle err.
    if (err) {
      next(err);
      return;
    }

    // Handle result.
    if (result) {
      res.status(200)
        .json({
          user: result
        });
    }
  });
};

const del = function(req, res, next) {
  const user = req.object;

  user.remove(function(err) {
    if (err) {
      next(err);
      return;
    }

    res.sendStatus(204);
  })
};

const me = function(req, res, next) {
  return res.status(200)
    .json({
      user: req.object
    });
};

export { list, post, get, patch, del, me };