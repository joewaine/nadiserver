const express = require("express");
const router = express.Router();


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept");
      next();
  });


const orderController = require("../controller/orderController");
const axios = require('axios');
const bodyParser = require("body-parser");


var jsonParser = bodyParser.json()


router.post("/addorder", jsonParser, orderController.addOrder);
// router.get('/allorders', orderController.getOrders);
// router.post('/:id', orderController.deleteOrder);




// .header("Access-Control-Allow-Origin", "*");

module.exports = router;



