const Order = require("../model/Order");
const fetch = require("node-fetch");
const btoa = require('btoa');
const axios = require('axios');
const e = require("express");



exports.addOrder = async (req, res) => {
    console.log('add to mongo emerge pay back end')
    // console.log(JSON.stringify(req.body))
    console.log(req.headers)
    req.header("Access-Control-Allow-Origin", "*");
    try {
        const order = new Order({
          email: req.body.payInfo.fulfillment_info.customer.email,
          payInfo: req.body.payInfo,
          orderInfo: req.body.orderInfo
        });
        console.log(order)
        let data = await order.save();
        // res.status(201).json({ data });
        // res.send(201)
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
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
   const user = await Order.findByOrderEmail('joe.waine@gmail.com')

  res.status(201).json({ user });
   } catch (err) {

  }
 };


  
  
  
  // try {
  //   const request = await fetch('https://hq.breadcrumb.com/ws/v1/menus/online_ordering/', {
  //     headers: {
  //       'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-llc`,
  //       'X-Breadcrumb-Password': 'uQM8mseTvnTX',
  //       'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`  
  //     }
  //   })
  //   if (request.ok) { 
  //     const body = await request.json();
  //     // console.log(body)
  //     res.status(201).json({ body });
  //   }
  // } catch (err) {
  //  res.status(400).json({ err: err });
  // }


