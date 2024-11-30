const express = require("express");
const { test, getUsers } = require("../controllers/userControllers");
 

const router = express.Router();

router.get("/test", test);

router.get("/getUsers", getUsers);

module.exports = router;