const checkoutModel = require("../models/checkout");

module.exports = {
  async addOrder(req, res) {
    console.log(req.body);
    await checkoutModel.create(req.body);
    console.log("Pesanan ditambahkan");
  },
};
