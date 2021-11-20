const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/image");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post(
  "/addProduct",
  upload.single("fotoProduk"),
  productController.addProduct
);

router.get('/:id', productController.getProduct)

router.post(
  "/edit/:id",
  upload.single("fotoProduk"),
  productController.editProduct
);

module.exports = router;
