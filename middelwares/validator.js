const { check, validationResult } = require("express-validator");

exports.registerValidation = () => [
  check("username", "This field cannot be empty.").notEmpty().escape(),
  check("email", "This field cannot be empty.").notEmpty().escape(),
  check("email", "Incorrect type.").isEmail().escape(),
  check("password", "This field should be at least 6 carac.").isLength({
    min: 6,
  }),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).send(errors.array());
};
