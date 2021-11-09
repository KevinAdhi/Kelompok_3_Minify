const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index", { title: "Document" });
});
router.get("/homePage", (req, res) => {
  res.render("pages/homePage", { title: "Home Page || Minify" });
});
router.get("/checkout", (req, res) => {
  res.render("pages/checkout", { title: "Checkout || Minify" });
});
router.get("/payment", (req, res) => {
  res.render("pages/payment", { title: "Payment || Minify" });
});
router.get("/myorder", (req, res) => {
  res.render("pages/myorder", { title: "My Order || Minify" });
});
router.get("/myOrderDetails", (req, res) => {
  res.render("pages/myOrderDetails", { title: "My Order Details || Minify" });
});
router.get("/message", (req, res) => {
  res.render("pages/message", { title: "Message || Minify" });
});
router.get("/dashboard", (req, res) => {
  res.render("pages/dashboard", { title: "Dashboard || Minify" });
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

router.get("/edit-product", (req, res) => {
  res.render("pages/editProduct", { title: "Edit Product || Minify" });
});

router.get("/product", async (req, res) => {
  var data = await Product.find();
  res.render("pages/product", { title: "Product || Minify", products: data });
});

router.get("/log-in", (req, res) => {
  res.render("pages/logIn", { title: "Log In || Minify" });
});

module.exports = router;
