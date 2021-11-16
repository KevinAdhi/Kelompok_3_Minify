const express = require("express");
const cart = require("../models/cart");
const Carts = require("../models/cart");
const router = express.Router();
const Checkout = require("../models/checkout");
const Order = require("../models/order");

router.get("/", function (req, res, next) {
  if (!req.session.cart) {
    res.redirect("/cart");
  }
  var cart = new Carts(req.session.cart);
  var checkout = new Checkout(req.session.checkout ? req.session.checkout : {});
  res.render("pages/checkout", {
    totalPrice: cart.totalPrice,
    products: cart.generateArray(),
    checkout,
    hargaAkhir: cart.totalPrice + checkout.hargaAkhir,
    title: "Checkout || Minify",
  });
});

router.get("/kurir/:id", (req, res) => {
  id = req.params.id;
  const checkout = new Checkout(
    req.session.checkout ? req.session.checkout : {}
  );
  checkout.kurir(id);
  req.session.checkout = checkout;
  res.redirect("/checkout");
});
module.exports = router;
// router.post("/checkout", function (req, res) {
//   var order = new Order({
//     user: req.session.isLoggedIn,
//     cart: cart,
//     address: req.body.address,
//     imagePath: req.body.imagePath,
//     name: req.body.name,
//   });
// });
