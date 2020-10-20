const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors({credentials: true, origin: true}));
app.options('*', cors())



const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const btoa = require('btoa');
const cron = require('node-cron');
require('dotenv').config();
const axios = require('axios');
const parseString = require('xml2js').parseString;
const qs = require('qs');
const mongoose = require("mongoose");
const config = require("./config/db");

const nodemailer = require('nodemailer');

const Order = require("./api/order/model/Order");



 


var sdk = require("emergepay-sdk");

const { createProxyMiddleware } = require('http-proxy-middleware');



//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
// .connect(config.database, { useNewUrlParser: true })
mongoose
.connect('mongodb+srv://joe:EiHitV6llWp73fa3@cluster0-9hdl4.mongodb.net/authapp?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev")); // configire morgan

app.get("/", (req, res) => {
  // res.send(JSON.stringify({ Hello: 'medddaeeen solider'}));
  // res.send(cors);
 res.send(JSON.stringify({ Hello: 'dont give up on me'}));
});

const userRoutes = require("./api/user/route/user"); //bring in our user routes
app.use("/user", userRoutes);

const productRoutes = require("./api/product/route/product"); //bring in our product routes
app.use("/product", productRoutes);

const orderRoutes = require("./api/order/route/order"); //bring in our product routes
app.use("/order", orderRoutes);

const tockRoutes = require("./api/tock/route/tock"); //bring in our tock routes
const e = require("express");

app.use("/tock", tockRoutes);

var oid = "1517492274";
var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOjMwNywib2lkIjoxNTE3NDkyMjc0LCJ0b2tlbl91c2UiOiJvcnQiLCJybmQiOjEyOTgyMzk1ODYuMDY0MjgyNCwiZ3JvdXBzIjpbIk9yZ0FQSVVzZXJzIl0sImlhdCI6MTU5OTI1ODg3MH0.zaMi_DDPspTKW6fl2utCGKXwdQT-Q39DKrFOhXxCHA4";
var environmentUrl = "https://api.emergepay-sandbox.chargeitpro.com/virtualterminal/v1";
var emergepay = new sdk.emergepaySdk({ oid: oid, authToken: authToken, environmentUrl: environmentUrl });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//The client side can hit this endpoint by issuing a POST request to


app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});


       var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'joe@mamnoonrestaurant.com',
          pass: 'Montebello7098!!'
        }
      });

app.post("/oloorder", function (req, res) {
  console.log(req.body)
  axios.post('https://hq.breadcrumb.com/ws/v1/orders', req.body,
    {
      headers: {
        'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-llc`,
        'X-Breadcrumb-Password': 'uQM8mseTvnTX',
        'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`
      }
    })
    .then(function (response) {

      let resData = response.data
      console.log(response)
      if (resData.result === 'success') {
        res.send(req.body)


        let htmlBody = `<p><h1>Your Order Has Been Placed!</h1><br>confirmation code: <b>${req.body.confirmation_code}</b><br/><br/>Estimated pickup time is 10 - 20 minutes.</p><br/><ul>`
        for(let i = 0;i<req.body.charges.items.length;i++){
          htmlBody = htmlBody + '<li>' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
        }
        
        htmlBody = htmlBody + '</ul><br>Thank you, Your friends at Mamnoon.'
        
        var mailOptions = {
        from: 'joe@mamnoonrestaurant.com',
        to: req.body.fulfillment_info.customer.email,
        // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
        subject: 'Your Mamnoon Order Has Been Received!',
        html: htmlBody 
        
        };





      }
    })
    .catch(function (error) {
      console.log(error)



    });

});



app.post("/oloorderstreet", function (req, res) {
  console.log(req.body)
  axios.post('https://hq.breadcrumb.com/ws/v1/orders', req.body,
    {
      headers: {
        'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-street`,
        'X-Breadcrumb-Password': 'TJzwaP8uguyy',
        'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`
      }
    })
    .then(function (response) {

      let resData = response.data
      console.log(response)
      if (resData.result === 'success') {
        res.send(req.body)



        
        let htmlBody = `<p><h1>Your Order Has Been Placed!</h1><br>confirmation code: <b>${req.body.confirmation_code}</b><br/><br/>Estimated pickup time is 10 - 20 minutes.</p><br/><ul>`
        for(let i = 0;i<req.body.charges.items.length;i++){
          htmlBody = htmlBody + '<li>' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
        }
        
        htmlBody = htmlBody + '</ul><br>Thank you, Your friends at Mamnoon.'
        
        var mailOptions = {
        from: 'joe@mamnoonrestaurant.com',
        to: req.body.fulfillment_info.customer.email,
        // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
        subject: 'Your Mamnoon Order Has Been Received!',
        html: htmlBody 
        
        };











      }
    })
    .catch(function (error) {
      console.log(error)



    });

});






let currentChecks = []


let seeIfTicketsClosedOut = async function(){
  console.log("do here")
  /////
  try {
    const request = await fetch('https://api.breadcrumb.com/ws/v2/checks.json?date=20200911', {
      headers: {
        'X-Breadcrumb-Username': `joe-waine_mamnoon-llc`,
        'X-Breadcrumb-Password': 'sbkh_Qgs4HMB',
        'X-Breadcrumb-API-Key': `6110e294b8984840d2c10472bbed3453`  
      }
    })
    if (request.ok) { 
      const body = await request.json();
      for(let i = 0;i<body.objects.length;i++){
        console.log(body.objects[i])
        // console.log(body.objects[i].status)
      }

      // res.status(201).json({ body });
    }
  } catch (err) {
  //  res.status(400).json({ err: err });
   console.log('error')
  }
//////



}


      // cron.schedule('* * * * *', () => {
      //   console.log('running a task every minute');


      //   seeIfTicketsClosedOut()
      // });

      //online order street
      //online order street
      //online order street





let req.body = {"billing":{"billing_name":"joseph p waine","billing_address":"1508 Melrose Avenue 5D","billing_postal_code":"98122"},"id":"3xctadj2ect_fghcu8qvh8a_on2v1ek09x","time_placed":"2020-10-15T22:38:36.323Z","confirmation_code":"mamnoon-98lxoqjuxn","charges":{"total":1025,"preTotal":881,"addedTotal":1025,"fees":0,"taxes":81,"tip":{"amount":144,"payment_type":"Generic Online Ordering Integrated"},"items":[{"name":"Hummus","cartId":"eqhhvdjgrbl_io9rek3p4a_gsm2i1wuy34","item_id":"e1d4fa26-9fd3-4e0f-9959-06837f93089a","price":800,"price_cents":800,"quantity":1,"instructions":"","modifiers":[],"sides":[]},{"name":"Chocolate","cartId":"eqhhvdjgrbl_io9rek3p4a_gsm2i1wuy34","item_id":"e1d4fa26-9fd3-4e0f-9959-06837f93089a","price":800,"price_cents":800,"quantity":1,"instructions":"","modifiers":[],"sides":[]}]},"fulfillment_info":{"type":"delivery","estimated_fulfillment_time":"2020-10-15T22:38:36.323Z","customer":{"email":"joe.waine@gmail.com","phone":"4254429308","name":"joseph p waine"},"instructions":"","no_tableware":true,"delivery_info":{"is_managed_delivery":false,"address":{"city":"Seattle","state":"Washington","zip_code":"98122","address_line1":"1508 Melrose Avenue","address_line2":"5D"}}},"payments":{"payments":[{"payment_type":"Generic Online Ordering Integrated","amount":881}]}}
// console.log(req.body)



let htmlBody = `<p><h1>Your Order Has Been Placed!</h1><br>confirmation code: <b>${req.body.confirmation_code}</b><br/><br/>Estimated pickup time is 10 - 20 minutes.</p><br/><ul>`
for(let i = 0;i<req.body.charges.items.length;i++){
  htmlBody = htmlBody + '<li>' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
}

htmlBody = htmlBody + '</ul><br>Thank you, Your friends at Mamnoon.'

var mailOptions = {
from: 'joe@mamnoonrestaurant.com',
to: req.body.fulfillment_info.customer.email,
// to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
subject: 'Your Mamnoon Order Has Been Received!',
html: htmlBody 

};

// // email send test
// transporter.sendMail(mailOptions, function(error, info){
// if (error) {
//   console.log(error);
// } else {
//   console.log('Email sent: ' + info.response);
// }
// });








  



