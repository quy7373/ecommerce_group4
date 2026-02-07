const express = require("express");
const upload = require("../middlewares/upload");
const productController = require("../controllers/productController");
const {
  authMiddlewareFromUrl,
  requireRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes with middleware (original)
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "newImages", maxCount: 10 },
    { name: "barcode", maxCount: 1 },
    { name: "qrCode", maxCount: 1 },
  ]),
  productController.addProduct,
);

router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "newImages", maxCount: 10 },
    { name: "barcode", maxCount: 1 },
    { name: "qrCode", maxCount: 1 },
  ]),
  productController.updateProduct,
);

// Routes with token from URL
router.post(
  "/token-auth/add",
  authMiddlewareFromUrl,
  requireRole("ADMIN"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "newImages", maxCount: 10 },
    { name: "barcode", maxCount: 1 },
    { name: "qrCode", maxCount: 1 },
  ]),
  productController.addProductWithUrlParams,
);

router.put(
  "/token-auth/update/:id",
  authMiddlewareFromUrl,
  requireRole("ADMIN"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "newImages", maxCount: 10 },
    { name: "barcode", maxCount: 1 },
    { name: "qrCode", maxCount: 1 },
  ]),
  productController.updateProductWithUrlParams,
);

router.get("/title/:title", productController.getProductByTitle);
router.get("/", productController.getProductsController);

router.get("/:id", productController.getProductById);

router.delete("/:id", productController.removeProduct);

module.exports = router;
