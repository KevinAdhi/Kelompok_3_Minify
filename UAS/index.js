const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// use layouts
app.use(layouts);
app.set("layout", "layouts/main.ejs");

// place all styles block in the layout at the head
app.set("layout extractStyles", true);
// place all scripts block in the layout at the end
app.set("layout extractScripts", true);

app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://Minify:zsXWMuraB0Hozzxc@cluster0.bf5ez.mongodb.net/Minify?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Succesfully connected to MongoDB using Mongoose!");
});

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server Berjalan di port ${PORT}`);
});
