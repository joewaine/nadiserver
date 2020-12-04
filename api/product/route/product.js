const express = require("express");
const router = express.Router();


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept");
    //   next();

    // intercept OPTIONS method
if ('OPTIONS' == req.method) {
    res.send(200);
} else {
    next();
}
  });


const productController = require("../controller/productController");
const upserveController = require("../controller/upserveController")
const axios = require('axios');
const bodyParser = require("body-parser");
router.post("/addproduct", productController.addProduct);
router.get('/allproducts', productController.getProducts);
router.post('/:id', productController.deleteProduct);


router.get('/upserveolo', upserveController.mamnoonItemsPullMenu);
router.get('/upserveolostreet', upserveController.mamnoonItemsPullMenuStreet);
router.get('/upserveolombar', upserveController.mamnoonItemsPullMenuMbar);






module.exports = router;




