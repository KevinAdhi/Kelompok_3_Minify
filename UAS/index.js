const path = require("path");
const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const session = require("express-session");

const app = express();
const PORT = 3000;

// use layouts
app.use(layouts);
app.set("layout", path.join(__dirname, "views/layouts/main.ejs"));

// place all styles block in the layout at the head
app.set("layout extractStyles", true);
// place all scripts block in the layout at the end
app.set("layout extractScripts", true);

app.use(bodyParser.urlencoded());

app.use(
  session({
    secret: "stringacak",
    cookie: {},
  })
);

app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(
    // "mongodb://localhost:27017/webpro?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    "mongodb+srv://minify:minify1234@cluster0.nodgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    (err, res) => {
        if (err) {
            console.error(err);
            console.log("not connect");
        } else {
            console.log("Database terhubung");
        }
    }
);

// mongoose.connect(
//   "mongodb://localhost:27017/webpro?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
//   {
//     useNewUrlParser: true,
//   }
// );
const db = mongoose.connection;

db.once("open", () => {
  console.log("Succesfully connected to MongoDB using Mongoose!");
});

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryBrandRouter = require("./routes/categoryBrand");

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use("/categoryBrand", categoryBrandRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.listen(PORT, () => {
  console.log(`Server Berjalan di port ${PORT}`);
});
