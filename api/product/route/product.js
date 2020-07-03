const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const request = require('request');
const fetch = require("node-fetch");
const btoa = require('btoa');


router.post("/addproduct", productController.addProduct);

router.get('/allproducts', productController.getProducts);



router.post('/:id', productController.deleteProduct);
      


router.get('/snipcartproducts', productController.snipCartProducts)



router.get('/tockmeals', productController.tockMeals)


router.get('/tockstreetmeals', productController.tockStreetMeals)












module.exports = router;




