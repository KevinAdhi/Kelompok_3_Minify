const express = require("express");
const Products = require("../models/product");
const Brands = require("../models/brand");
const Categories = require("../models/category");
const Carts = require("../models/cart");
const Wish = require("../models/wish");
const Orders = require("../models/order");
var Catalog = false;

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index", { title: "Document" });
});

router.get("/login", (req, res) => {
  res.render("pages/login", { title: "Login || Minify" });
});

router.get("/homePage", async (req, res) => {
  const categories = await Categories.find();
  res.render("pages/homePage", { categories, title: "Home Page || Minify" });
});
router.get("/checkout", (req, res) => {
  res.render("pages/checkout", { title: "Checkout || Minify" });
});
router.get("/payment", (req, res) => {
  res.render("pages/payment", { title: "Payment || Minify" });
});
router.get("/myorder", async (req, res) => {
  var order = await Orders.find();
  res.render("pages/myorder", { orders: order, title: "My Order || Minify" });
});
router.get("/myOrderDetails/:id", async (req, res) => {
  try {
    await Orders.findById(req.params.id, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.render("pages/myOrderDetails", {
          orders: data,
          title: "My Order Details || Minify",
        });
      }
    });
  } catch (e) {}
});
router.get("/message", (req, res) => {
  res.render("pages/message", { title: "Message || Minify" });
});

router.get("/chat-room", (req, res) => {
  res.render("pages/chatRoom", { title: "Chat Room || Minify" });
});

router.get("/profile", (req, res) => {
  res.render("pages/profile", { title: "Profile || Minify" });
});

router.get("/edit-profile", (req, res) => {
  res.render("pages/editProfile", { title: "Edit Profile || Minify" });
});

router.get("/HowToOrder", (req, res) => {
  res.render("pages/HowToOrder", { title: "How To Order || Minify" });
});

router.get("/Terms", (req, res) => {
  res.render("pages/Terms", { title: "Terms || Minify" });
});

router.get("/FAQ", (req, res) => {
  res.render("pages/FAQ", { title: "FAQ || Minify" });
});

router.get("/verificationcode", (req, res) => {
  res.render("pages/verificationcode", {
    title: "Verification Code || Minify",
  });
});

router.get("/edit-product", (req, res) => {
  res.render("pages/editProduct", { title: "Edit Product || Minify" });
});

router.get("/product", async (req, res) => {
  var data = await Products.find();
  res.render("pages/product", { products: data, title: "Product || Minify" });
});

router.get("/details/:id", async (req, res) => {
  var productId = req.params.id;
  var data = await Products.findById(productId);

  res.render("pages/details", {
    products: data,
    title: "Product || Minify",
  });
});

router.get("/best", (req, res) => {
  res.render("pages/best", { title: "Best || Minify" });
});

router.get("/cart", (req, res) => {
  res.render("pages/cart", { title: "Cart || Minify" });
});

router.get("/newArrival", (req, res) => {
  res.render("pages/newArrival", { title: "New Arrival || Minify" });
});

router.get("/Company", (req, res) => {
  res.render("pages/Company", { title: "Company || Minify" });
});

router.get("/register", (req, res) => {
  res.render("pages/register", { title: "Register || Minify" });
});

router.get("/add-to-wish/:id", (req, res, next) => {
  const productId = req.params.id;
  const wish = new Wish(req.session.wish ? req.session.wish : {});

  if (req.session.isLoggedIn) {
    Products.findById(productId, function (err, product) {
      if (err) {
        return res.redirect("/product");
      }
      wish.add(product, product.id);
      req.session.wish = wish;
      console.log(req.session.wish);
      res.redirect("/product");
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/changepassword", (req, res) => {
  res.render("pages/changepassword", { title: "Change Password || Minify" });
});

router.get("/forgetpassword", (req, res) => {
  res.render("pages/forgetpassword", { title: "Forget Password || Minify" });
});

router.get("/add-to-cart/:id", (req, res, next) => {
  const productId = req.params.id;
  const cart = new Carts(req.session.cart ? req.session.cart : {});

  if (req.session.isLoggedIn) {
    Products.findById(productId, function (err, product) {
      if (err) {
        return res.redirect("/product");
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/product");
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/buyNow/:id", (req, res) => {
  const productId = req.params.id;
  const cart = new Carts(req.session.cart ? req.session.cart : {});
  if (req.session.isLoggedIn) {
    Products.findById(productId, function (err, product) {
      if (err) {
        return res.redirect("/product");
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/checkout");
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
