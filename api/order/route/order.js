const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const axios = require('axios');
const bodyParser = require("body-parser");
router.post("/addorder", orderController.addOrder);
// router.get('/allorders', orderController.getOrders);
// router.post('/:id', orderController.deleteOrder);


 

module.exports = router;



