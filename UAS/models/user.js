const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  noHP: {
    type: Number,
    required: true,
  },
  tglLahir: {
    type: Date,
    required: true,
  },
  noHP: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema, "user");
