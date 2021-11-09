const express = require("express");

const router = express.Router();

router.post("/login", async (req, res) => {
    // get user input
    const email = req.body.email;
    const password = req.body.password;

    if (email === "admin@mail.com" && password === "admin") {
        req.session.user = "admin";
        req.session.isLoggedIn = true;
        res.redirect("/homePage");
    } else if (email === "customer@mail.com" && password === "customer") {
        req.session.user = "customer";
        req.session.isLoggedIn = true;
        res.redirect("/homePage");
    } else {
        // render the login page with error information
        res.render("pages/login", { error: "Wrong username or password." });
    }
});

router.get("/logout", async (req, res) => {
    req.session.isLoggedIn = false;
    res.redirect("/homePage");
});

module.exports = router;
