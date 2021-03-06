const Recepie = require("../models/Recepie");
const validator = require("express-validator");

// Get all recepies.
module.exports.list = function (req, res, next) {
  Recepie.find({}, function (err, recepies) {
    if (err) {
      return res.status(500).json({
        message: "Error getting records.",
      });
    }
    return res.json(recepies);
  })
    .sort({ _id: -1 })
    .limit(5);
};

// Get one recepie.
module.exports.show = function (req, res) {
  var id = req.params.id;
  Recepie.findOne({ _id: id }, function (err, recepie) {
    if (err) {
      return res.status(500).json({});
    }
    if (!recepie) {
      return res.status(404).json({
        message: "No such record",
      });
    }
    return res.json(recepie);
  });
};

// Get all recepies from logged in user.
module.exports.showUserRecepies = function (req, res, next) {
  Recepie.find(
    {
      author_id: req.params.id,
    },
    function (err, recepies) {
      if (err) {
        return res.status(500).json({
          message: "Error getting record.",
        });
      }
      if (!recepies) {
        return res.status(404).json({
          message: "No such record",
        });
      }
      return res.json(recepies);
    }
  );
};

// Get all recepies from another user.
module.exports.showAnotherUserRecepies = function (req, res, next) {
  Recepie.find(
    {
      author_id: req.params.id,
    },
    function (err, recepies) {
      if (err) {
        return res.status(500).json({
          message: "Error getting record.",
        });
      }
      if (!recepies) {
        return res.status(404).json({
          message: "No such record",
        });
      }
      return res.json(recepies);
    }
  );
};

// Get all recepies based on search.
module.exports.showSearchRecepies = function (req, res, next) {
  Recepie.find(
    { title: { $regex: req.params.id, $options: "i" } },
    function (err, recepies) {
      if (err) {
        return res.status(500).json({
          message: "Error getting record.",
        });
      }
      if (!recepies) {
        return res.status(404).json({
          message: "No such record",
        });
      }
      return res.json(recepies);
    }
  );
};

// Create new recepie.
module.exports.create = [
  // validations rules
  validator.body("title", "Please enter Recepie Title").isLength({ min: 1 }),
  validator.body("title").custom((value) => {
    return Recepie.findOne({ title: value }).then((recepie) => {
      if (recepie !== null) {
        return Promise.reject("Title already in use");
      }
    });
  }),
  validator
    .body("ingredients", "Please enter Ingredients Content")
    .isLength({ min: 1 }),
  validator
    .body("instructions", "Please enter Instructions Content")
    .isLength({ min: 1 }),

  function (req, res) {
    // throw validation errors
    console.log("inside controller");
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var recepie = new Recepie({
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      author_id: req.body.author_id,
      full_name: req.body.full_name,
    });

    // save record
    recepie.save(function (err, recepie) {
      if (err) {
        return res.status(500).json({
          message: "Error saving record",
          error: err,
        });
      }
      return res.json({
        message: "saved",
        _id: recepie._id,
      });
    });
  },
];

// Update recepie.
module.exports.update = [
  // Validation rules
  validator.body("title", "Please enter Recepie Title").isLength({ min: 1 }),
  validator.body("title").custom((value, { req }) => {
    return Recepie.findOne({ title: value, _id: { $ne: req.params.id } }).then(
      (recepie) => {
        if (recepie !== null) {
          return Promise.reject("Title already in use");
        }
      }
    );
  }),
  validator
    .body("ingredients", "Please enter Ingredients")
    .isLength({ min: 1 }),
  validator
    .body("instructions", "Please enter Instructions")
    .isLength({ min: 1 }),

  function (req, res) {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var id = req.params.id;
    Recepie.findOne({ _id: id }, function (err, recepie) {
      if (err) {
        return res.status(500).json({
          message: "Error saving record",
          error: err,
        });
      }
      if (!recepie) {
        return res.status(404).json({
          message: "No such record",
        });
      }

      recepie.title = req.body.title ? req.body.title : recepie.title;
      recepie.ingredients = req.body.ingredients
        ? req.body.ingredients
        : recepie.ingredients;
      recepie.instructions = req.body.instructions
        ? req.body.instructions
        : recepie.instructions;

      recepie.save(function (err, recepie) {
        if (err) {
          return res.status(500).json({
            message: "Error getting record.",
          });
        }
        if (!recepie) {
          return res.status(404).json({
            message: "No such record",
          });
        }
        return res.json(recepie);
      });
    });
  },
];

// Delete recepie.
module.exports.delete = function (req, res) {
  var id = req.params.id;
  Recepie.findByIdAndRemove(id, function (err, recepie) {
    if (err) {
      return res.status(500).json({
        message: "Error getting record.",
      });
    }
    return res.json(recepie);
  });
};
