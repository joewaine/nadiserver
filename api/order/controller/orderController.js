const Order = require("../model/Order");
const fetch = require("node-fetch");
const btoa = require('btoa');
const axios = require('axios');
const e = require("express");



exports.addOrder = async (req, res) => {
    try {
        const order = new Order({
          email: req.body.payInfo.fulfillment_info.customer.email,
          payInfo: req.body.payInfo,
          orderInfo: req.body.orderInfo
        });
        // console.log(order)
        let data = await order.save();
        res.json({ data });


// intercept OPTIONS method
if ('OPTIONS' == req.method) {
  res.send(200);
} else {
  next();
}



      } catch (err) {
        res.status(400).json({ err: err });
      }
};



exports.retrieveOrders = async (req, res) => {
console.log(req.params.email)

  try {
    // const user = 'req params email'
  //  const user = await Order.findByOrderEmail(req.params.email)
   const user = await Order.findByOrderEmail(req.params.email)

  res.status(201).json({ user });
   } catch (err) {

  }
 };