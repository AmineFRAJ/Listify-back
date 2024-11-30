const User = require("../models/user");


exports.test = async (req, res) => {
  try {
    res.status(200).send("Test user OK!");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return res.status(404).send({ msg: "No user found" });
      }
      res.status(200).send(users);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error);
    }
  };
  