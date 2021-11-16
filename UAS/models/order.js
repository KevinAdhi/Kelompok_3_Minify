const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: orderSchema.Types.ObjectId,
    ref: "User",
  },
  cart: {
    type: Object,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema, "order");
