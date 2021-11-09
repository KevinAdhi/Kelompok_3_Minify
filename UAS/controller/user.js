const userModel = require('../models/user')

module.exports = {
    async login(req, res) {
        // get user input
        const email = req.body.email;
        const password = req.body.password;

        const user = await userModel.findOne({
            email: email
        })

        if (!user) {
            res.render('pages/login', {
                error: 'wrong username or password'
            })
        }

        const userPassword = user.password
        if (password === user.password) {
            req.session.user = "customer";
            req.session.isLoggedIn = true;
            res.redirect("/homePage");
        } else {
            res.render('pages/login', {
                error: 'wrong username or password'
            })
        }

        // if (email === "admin@mail.com" && password === "admin") {
        //     req.session.user = "admin";
        //     req.session.isLoggedIn = true;
        //     res.redirect("/homePage");
        // } else if (email === "customer@mail.com" && password === "customer") {
        //     req.session.user = "customer";
        //     req.session.isLoggedIn = true;
        //     res.redirect("/homePage");
        // } else {
        //     // render the login page with error information
        //     res.render("pages/login", { error: "Wrong username or password." });
        // }
    },
    async register(req, res) {
        await userModel.create(req.body)

        res.redirect('/log-in')
    }
}
