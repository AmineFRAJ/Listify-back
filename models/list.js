const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },]
  },
  {
    timestamps: true,
  },
  {
    collection: "Lists",
  }
);
module.exports = List = mongoose.model("List", listSchema);
