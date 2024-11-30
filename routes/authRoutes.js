const express = require("express");
const { test, register, login } = require("../controllers/authControllers");
const { registerValidation, validator } = require("../middelwares/validator");
const isAuth = require("../middelwares/isAuth");

const router = express.Router();

router.get("/test", test);
router.post("/register", registerValidation(), validator, register);
router.post("/login", login);

// current Route
router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
