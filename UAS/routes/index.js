const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
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

module.exports = router;
