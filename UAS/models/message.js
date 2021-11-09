const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Messsage", messageSchema, "message");
