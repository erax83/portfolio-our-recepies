const Recepie = require("../models/Recepie");
const validator = require("express-validator");

// Get all
module.exports.list = function (req, res, next) {
  Recepie.find({}, function (err, recepies) {
    if (err) {
      return res.status(500).json({
        message: "Error getting records.",
      });
    }
    return res.json(recepies);
  });
};

// Get one
module.exports.show = function (req, res) {
  var id = req.params.id;
  Recepie.findOne({ _id: id }, function (err, recepie) {
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
};

// Create
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
    .body("ingrediences", "Please enter Ingrediences Content")
    .isLength({ min: 1 }),
  validator
    .body("Instructions", "Please enter Instructions Content")
    .isLength({ min: 1 }),

  function (req, res) {
    // throw validation errors
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // initialize record
    var recepie = new Recepie({
      title: req.body.title,
      ingrediences: req.body.ingrediences,
      instructions: req.body.instructions,
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

// Update
module.exports.update = [
  // validation rules
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
    .body("ingrediences", "Please enter Ingrediences")
    .isLength({ min: 1 }),
  validator
    .body("instructions", "Please enter Instructions")
    .isLength({ min: 1 }),

  function (req, res) {
    // throw validation errors
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

      // initialize record
      recepie.title = req.body.title ? req.body.title : recepie.title;
      recepie.ingrediences = req.body.ingrediences
        ? req.body.ingrediences
        : recepie.ingrediences;
      recepie.instructions = req.body.instructions
        ? req.body.instructions
        : recepie.instructions;

      // save record
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

// Delete
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
