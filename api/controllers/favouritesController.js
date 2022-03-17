const Favourite = require("../models/Favourite");
const validator = require("express-validator");

// Create
module.exports.create = [
  validator.body("author_id", "Please enter author id.").isLength({ min: 1 }),
  validator.body("author_id").custom((value) => {
    return Favourite.findOne({ author_id: value }).then((author_id) => {
      if (author_id !== null) {
        return Promise.reject("Title already in use");
      }
    });
  }),

  function (req, res) {
    console.log("inside create favourite controller");
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    var favourite = new Recepie({
      author_id: req.body.author_id,
    });

    favourite.save(function (err, favourite) {
      if (err) {
        return res.status(500).json({
          message: "Error saving record",
          error: err,
        });
      }
      return res.json({
        message: "saved",
        _id: favourite._id,
      });
    });
  },
];
