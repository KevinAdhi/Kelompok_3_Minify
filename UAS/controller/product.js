const productModel = require("../models/product");
const url = require("url");

module.exports = {
  async addProduct(req, res) {
    var product = {
      image: req.file.path,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      stock: req.body.stock,
      description: req.body.description,
      rating: req.body.rating,
    };
    if (!req.file) {
      console.log("Tidak ada file yang diupload");
    } else {
      console.log("produk: " + req.session);
      await productModel.create(product);
      console.log("product ditambahkan");
    }
    var catalog = true;

    res.redirect(
      url.format({
        pathname: "/dashboard",
        query: {
          catalog,
        },
      })
    );
  },
};
