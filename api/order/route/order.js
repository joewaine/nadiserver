const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const axios = require('axios');
const bodyParser = require("body-parser");


var jsonParser = bodyParser.json()


router.post("/addorder", jsonParser, orderController.addOrder);
// router.get('/allorders', orderController.getOrders);
// router.post('/:id', orderController.deleteOrder);


 

module.exports = router;



