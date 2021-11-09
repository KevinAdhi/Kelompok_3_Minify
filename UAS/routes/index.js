const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.get("/homePage", (req, res) => {
  res.render("pages/homePage");
});
router.get("/checkout", (req, res) => {
  res.render("pages/checkout");
});
router.get("/payment", (req, res) => {
  res.render("pages/payment");
});
router.get("/myorder", (req, res) => {
  res.render("pages/myorder");
});
router.get("/myOrderDetails", (req, res) => {
  res.render("pages/myOrderDetails");
});
router.get("/message", (req, res) => {
  res.render("pages/message");
});
router.get("/dashboard", (req, res) => {
  res.render("pages/dashboard");
});

router.get("/chat-room", (req, res) => {
  res.render("pages/chatRoom");
});

router.get("/profile", (req, res) => {
  res.render("pages/profile");
});

router.get("/edit-profile", (req, res) => {
  res.render("pages/editProfile");
});

router.get("/HowToOrder", (req, res) => {
  res.render("pages/HowToOrder");
});

router.get("/Terms", (req, res) => {
  res.render("pages/Terms");
});

router.get("/FAQ", (req, res) => {
  res.render("pages/FAQ");
});

router.get("/verificationcode", (req, res) => {
  res.render("pages/verificationcode");
});

router.get("/edit-product", (req, res) => {
  res.render("pages/editProduct");
});

// router.get("/product", async (req, res) => {
//   var data = await Product.find();
//   res.render("pages/product", { products: data });
// });

router.get("/best", (req, res) => {
  res.render("pages/best");
});

router.get("/product", (req, res) => {
  res.render("pages/product");
});

router.get("/details", (req, res) => {
  res.render("pages/details");
});

router.get("/cart", (req, res) => {
  res.render("pages/cart");
});

router.get("/newArrival", (req, res) => {
  res.render("pages/newArrival");
});

router.get("/Company", (req, res) => {
  res.render("pages/Company");
});

router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.get("/wishlist", (req, res) => {
  res.render("pages/wishlist");
});

router.get("/changepassword", (req, res) => {
  res.render("pages/changepassword");
});

router.get("/forgetpassword", (req, res) => {
  res.render("pages/forgetpassword");
});

module.exports = router;
