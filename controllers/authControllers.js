const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//test 
exports.test = async (req, res) => {
  try {
    res.status(200).send("Auth Test OK!");
  } catch (error) {
    res.status(500).send(error);
  }
};

// register
exports.register = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      
  
      let foundUser = await User.findOne({ email });
  
      if (foundUser) {
        return res.status(400).send({ errors: [{ msg: "Email already used" }] });
      }
  
      const salt = 10;
      let hashedPassword = await bcrypt.hash(password, salt);
  
      let newUser = await new User({ ...req.body });
  
      newUser.password = hashedPassword;
  
      await newUser.save();
  
      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.SECRET_KEY
      );
  
      res
        .status(200)
        .send({ success: [{ msg: "Register Successfully !" }], newUser, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ errors: [{ msg: "Can not register" }] });
    }
  };

  // login
exports.login = async (req, res) => {
    try {
      let { email, password } = req.body;
  
      let foundUser = await User.findOne({ email });
  
      if (!foundUser) {
        return res
          .status(400)
          .send({ errors: [{ msg: "No user found with this email address" }] });
      }
  
      let hashedPassword = await bcrypt.compare(password, foundUser.password);
  
      if (!hashedPassword) {
        return res.status(400).send({ errors: [{ msg: "Incorrect password" }] });
      }
  
      const token = jwt.sign(
        {
          id: foundUser._id,
        },
        process.env.SECRET_KEY
      );
  
      res
        .status(200)
        .send({
          success: [{ msg: `Hello ${foundUser.username} Welcome Back !` }],
          foundUser,
          token,
        });
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ errors: [{ msg: "Can not login" }] });
    }
  };
  