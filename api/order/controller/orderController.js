const Order = require("../model/Order");
const fetch = require("node-fetch");
const btoa = require('btoa');
const axios = require('axios');



exports.addOrder = async (req, res) => {
    console.log('add to mongo emerge pay back end')
    // console.log(JSON.stringify(req.body))
    console.log(req.headers)
    try {
        const order = new Order({
          payInfo: req.body.payInfo,
          orderInfo: req.body.orderInfo
        });
        console.log(order)
        let data = await order.save();
        res.status(201).json({ data });




      } catch (err) {
        res.status(400).json({ err: err });
      }
};



