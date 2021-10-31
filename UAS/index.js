const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.listen(PORT, () => {
  console.log(`Server Berjalan di port ${PORT}`);
});
