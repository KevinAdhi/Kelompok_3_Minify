const productModel = require("../models/product");

module.exports = {
    async addProduct(req, res) {
        await productModel.create(req.body);
        console.log("product ditambahkan");
    },
};
