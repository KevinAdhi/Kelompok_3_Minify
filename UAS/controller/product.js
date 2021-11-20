const productModel = require("../models/product");
const categoryModel = require("../models/category");
const brandModel = require("../models/brand");
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
  async getProduct(req, res) {
    const productId = req.params.id

    const product = await productModel.findOne({
      _id: productId
    })

    console.log(productId)

    const categories = await categoryModel.find()
    const brands = await brandModel.find()

    res.render('pages/dashboardPages/editProduct', {
      product: product,
      categories: categories,
      brands: brands,
      title: `edit ${product.name}`
    })
  },
  async editProduct(req, res) {
    const productId = req.params.id

    await productModel.findOneAndUpdate({
      id: productId
    }, req.body)

    res.redirect('/dashboard');
  },
};
