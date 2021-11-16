const express = require("express");
const router = express.Router();
const Carts = require("../models/cart");
const Products = require("../models/product");

router.get("/", function (req, res, next) {
  if (!req.session.cart) {
    return res.render("pages/cart", {
      products: 0,
      title: "Cart || Minify",
    });
  }
  var cart = new Carts(req.session.cart);
  res.render("pages/cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    totalQty: cart.totalQty,
    title: "Cart || Minify",
  });
});

router.get("/remove/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Carts(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect("/cart");
});

router.get("/reduce/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Carts(req.session.cart ? req.session.cart : {});

  cart.reduce(productId);
  req.session.cart = cart;
  res.redirect("/cart");
});

router.get("/increase/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Carts(req.session.cart ? req.session.cart : {});

  cart.increase(productId);
  req.session.cart = cart;
  res.redirect("/cart");
});

router.get("/add-to-wish-from-cart/:id", (req, res, next) => {
  const productId = req.params.id;
  const wish = new Wish(req.session.wish ? req.session.wish : {});
  const cart = new Carts(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function (err, product) {
    if (err) {
      return res.redirect("/product");
    }
    wish.add(product, product.id);
    cart.removeItem(productId);
    req.session.wish = wish;
    req.session.cart = cart;
    console.log(req.session.wish);
    res.redirect("/cart");
  });
});

module.exports = router;
