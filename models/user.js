const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    list: [
      {
        type: mongoose.Types.ObjectId,
        ref: "list",
      },
    ],
  },
  { timestamps: true },
  { collection: "users" }
);

// export schema
module.exports = User = mongoose.model("User", userSchema);
