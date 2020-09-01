const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const upserveController = require("../controller/upserveController")

router.post("/addproduct", productController.addProduct);
router.get('/allproducts', productController.getProducts);
router.post('/:id', productController.deleteProduct);




router.get('/upserve', upserveController.mamnoonItems);
router.get('/upserveolo', upserveController.mamnoonItemsPullMenu);

module.exports = router;




