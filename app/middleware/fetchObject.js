const fetchObject = function(model) {
  return function(req, res, next) {
    const id = (req.params.id === 'me') ? req.authenticated._id : req.params.id;

    model.findById(id, function (err, object) {
      // Handle err.
      if (err) {
        next(err);
        return;
      }

      // Handle missing API.
      if (!object) {
        next({detail: "API not found"});
        return;
      }

      // Handle object.
      if (object) {
        req.object = object;
        next();
      }
    });
  };
};

export { fetchObject };