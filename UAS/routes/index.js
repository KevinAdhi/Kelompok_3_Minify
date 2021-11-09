const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index");
});

router.get("/log-in", (req, res) => {
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

router.get("/edit-product", (req, res) => {
    res.render("pages/editProduct");
});

router.get("/product", async (req, res) => {
    var data = await Product.find();
    res.render("pages/product", { products: data });
});

module.exports = router;
