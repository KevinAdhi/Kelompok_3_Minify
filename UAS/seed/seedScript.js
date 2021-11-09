const Product = require("../models/product");
const User = require("../models/user");
const Message = require("../models/message");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Minify:zsXWMuraB0Hozzxc@cluster0.bf5ez.mongodb.net/Minify?retryWrites=true&w=majority",
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database terhubung untuk seeding");
    }
  }
);

const products = [
  new Product({
    imagePath:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    name: "Test",
    price: 100000,
  }),
  new Product({
    imagePath:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    name: "Test1",
    price: 100000,
  }),
  new Product({
    imagePath:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    name: "Test2",
    price: 100000,
  }),
  new Product({
    imagePath:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    name: "Test3",
    price: 100000,
  }),
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save((err, res) => {
    done++;
    if (done == products.length) {
      console.log("Product berhasil diupload");
      mongoose.disconnect();
    }
  });
}
