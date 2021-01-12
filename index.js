
const compression = require("compression");
const cors = require('cors');
const express = require('express');
const app = express();

app.use(compression())

app.use(cors({credentials: true, origin: true}));
app.options('*', cors())
var DomParser = require('dom-parser');
var parser = new DomParser();


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
var convert = require('xml-js');

const moment = require('moment')
const tz = require('moment-timezone')



const Order = require("./api/order/model/Order");

const nodemailer = require('nodemailer');
const nodemailer2 = require('nodemailer');
const nodemailer4 = require('nodemailer');
const nodemailer5 = require('nodemailer');
const twilio = require('twilio');

const PNF = require('google-libphonenumber').PhoneNumberFormat;

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();



// let client = new twilio('AC47c2d4df4e5ae7089fdd1e148308439e', 'f28ed5eef0ac3f7bcb23d40f071974e3');
let client = new twilio('AC47c2d4df4e5ae7089fdd1e148308439e', 'be0f04caeae8e2ac0e2abad0886bfccd');




var sdk = require("emergepay-sdk");

const { createProxyMiddleware } = require('http-proxy-middleware');

// let shippo = require('shippo')('shippo_live_b6790372812ed8e4f0c852e5f46801e3c8cddfd8');


let shippo = require('shippo')('shippo_test_269049c928caf592075ece7cfc698e8cddeff9d5');


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

app.use(morgan("dev")); // configure morgan





let snipCartItems = null

async function snipCarts () {

  try {


    let request = await fetch(`https://mamnoontogo.net/wp-json/acf/v3/restaurant/188/`)

// console.log(request)



    if (request.ok) { 
      let body = await request.json();


let correctSelect = body.acf.content_fields.filter(function(x){
  return x.acf_fc_layout === 'online_shop'
})
snipCartItems = correctSelect[0].online_shop.map((x)=> x.shop_item)
// return correctSelect[0].online_shop

    }
  } catch (err) {
  console.log(err)
  console.log('failure')
  }
}

app.get(`/snipcartitems`, async function(req, res) {

  let emptybuttons = ''

for(let i = 0;i<snipCartItems.length;i++){
  emptybuttons = emptybuttons + `<button data-item-id="${snipCartItems[i].id}" data-item-price="${snipCartItems[i].price}" data-item-image="${snipCartItems[i].image}" data-item-name="${snipCartItems[i].name}" data-item-description="${snipCartItems[i].description}" data-item-weight="${snipCartItems[i].weight}" data-item-url="${snipCartItems[i].url}" class="snipcart-add-item" style="margin: 0px auto;">button</button>`
}

// res.json(snipCartItems[index]);
res.send(emptybuttons)
});

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


//sandbox

var oid = "1517492274";
var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOjMwNywib2lkIjoxNTE3NDkyMjc0LCJ0b2tlbl91c2UiOiJvcnQiLCJybmQiOjEyOTgyMzk1ODYuMDY0MjgyNCwiZ3JvdXBzIjpbIk9yZ0FQSVVzZXJzIl0sImlhdCI6MTU5OTI1ODg3MH0.zaMi_DDPspTKW6fl2utCGKXwdQT-Q39DKrFOhXxCHA4";
var environmentUrl = "https://api.emergepay-sandbox.chargeitpro.com/virtualterminal/v1";


// production
// var oid = "1535166774";
// var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOjExMDQsIm9pZCI6MTUzNTE2Njc3NCwidG9rZW5fdXNlIjoib3J0Iiwicm5kIjoxMzcxODQ2NDQ5LjI1MzIzNzUsImdyb3VwcyI6WyJPcmdBUElVc2VycyJdLCJpYXQiOjE2MDU3OTc1NjB9.EeodYvyKoGC_Mp06KdMV8VcuoLQib5ehyPO9Rg5ylNo";
// var environmentUrl = "https://api.emergepay.chargeitpro.com/virtualterminal/v1";



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
  user: 'orders@mamnoonrestaurant.com',
  pass: 'orders4mama'
}
});


var transporter2 = nodemailer2.createTransport({
  service: 'gmail',
  auth: {
    user: 'orders@mamnoonrestaurant.com',
    pass: 'orders4mama'
  }
  });


  var transporter4 = nodemailer4.createTransport({
    service: 'gmail',
    auth: {
      user: 'orders@mamnoonrestaurant.com',
      pass: 'orders4mama'
    }
    });

    var transporter5 = nodemailer4.createTransport({
      service: 'gmail',
      auth: {
        user: 'orders@mamnoonrestaurant.com',
        pass: 'orders4mama'
      }
      });

  app.post("/oloorderretail", function (req, res) {
    console.log('oloorder retail')
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
        // console.log(response)
        if (resData.result === 'success') {


          res.send(req.body)





if(req.body.fulfillment_info.delivery_info.address.zip_code === ''){
console.log('no zipcode, so its pickup')







let htmlBody = `<div style="background-color: #f05d5b;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;
  
if(req.body.fulfillment_info.type === 'delivery'){
  htmlBody = htmlBody + `Your Retail Order Has Been Received!</h1></div>`
}else{
  htmlBody = htmlBody + `Your Retail Order Has Been Received!</h1></div>`
}

htmlBody = htmlBody + `<p style="text-align: center;margin: 0 auto;width: 100%;"><br>Thanks for your order!<br>
<br><span style="font-size: 20px !important;">confirmation code: <b>${req.body.confirmation_code}</b></span><br/><br/>Estimated pickup time is 10 - 20 minutes.</p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
for(let i = 0;i<req.body.charges.items.length;i++){
  htmlBody = htmlBody + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
}

htmlBody = htmlBody + '</ul><br><p style="text-align: center;margin: 0 auto;width: 100%;">Thank you, Your friends at Mamnoon.<br><br><i>1508 Melrose Ave, Seattle WA 98122</i><br><a href="https://nadimama.com">nadimama.com</p>'
        
var mailOptions = {
from: 'orders@mamnoonrestaurant.com',
to: req.body.fulfillment_info.customer.email,
// to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
subject: `Your Mamnoon Retail Order Has Been Placed! We will notify you when the order is being prepared.`,
html: htmlBody 
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});





  




const number = phoneUtil.parseAndKeepRawInput(req.body.fulfillment_info.customer.phone, 'US');
let smsNumber = phoneUtil.format(number, PNF.E164);

// Send the text message.
if(req.body.sms === true){
client.messages.create({
to: smsNumber,
from: '+12062087871',
body: 'Your Mamnoon Retail Order Has Been Placed! We will notify you when the order is being prepared. Thank You.'
});
}













}else{









  let htmlBody = `<div style="background-color: #f05d5b;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;
  
  if(req.body.fulfillment_info.type === 'delivery'){
    htmlBody = htmlBody + `Your Retail Order Has Been Received!</h1></div>`
  }else{
    htmlBody = htmlBody + `Your Retail Order Has Been Received!</h1></div>`
  }
  
  htmlBody = htmlBody + `<p style="text-align: center;margin: 0 auto;width: 100%;"><br>Thanks for your order!<br><br><span style="font-size: 20px !important;">confirmation code: <b>${req.body.confirmation_code}</b></span><br/><br/>We are getting your order ready to ship!<br>Your shipment will be sent to ${req.body.fulfillment_info.delivery_info.address.address_line1}, ${req.body.fulfillment_info.delivery_info.address.address_line2}, ${req.body.fulfillment_info.delivery_info.address.city}, ${req.body.fulfillment_info.delivery_info.address.state}, ${req.body.fulfillment_info.delivery_info.address.zip_code}</p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
  for(let i = 0;i<req.body.charges.items.length;i++){
    htmlBody = htmlBody + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
  }
  
  htmlBody = htmlBody + '</ul><br><p style="text-align: center;margin: 0 auto;width: 100%;">Thank you, Your friends at Mamnoon.<br><br><i>1508 Melrose Ave, Seattle WA 98122</i><br><a href="https://nadimama.com">nadimama.com</p>'
          
 
          

  var mailOptions = {
  from: 'orders@mamnoonrestaurant.com',
  to: req.body.fulfillment_info.customer.email,
  // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
  subject: `Your Mamnoon Retail Order Has Been Placed! We will notify you when the order is being prepared.`,
  html: htmlBody 
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  const number = phoneUtil.parseAndKeepRawInput(req.body.fulfillment_info.customer.phone, 'US');
  let smsNumber = phoneUtil.format(number, PNF.E164);

// Send the text message.
if(req.body.sms === true){
client.messages.create({
to: smsNumber,
from: '+12062087871',
body: 'Your Mamnoon Retail Order Has Been Placed! Thank You.'
});
}




shippoSend(req)



}
        }
      })
      .catch(function (error) {
        console.log(error)
  
  
  
      });
  
  });




  async function shippoSend(req) {







    // console.log(JSON.parse(req.query.orderInfo).fulfillment_info.delivery_info.address))

    
    var addressFrom = {
      "name": "Nadi mama",
      "street1": "1508 Melrose Ave",
      "city": "Seattle",
      "state": "WA",
      "zip": "98122",
      "country": "US"
  };
  

    var addressTo = {
      "name": req.body.fulfillment_info.customer.first_name,
      "street1": req.body.fulfillment_info.delivery_info.address.address_line1,
      "city": req.body.fulfillment_info.delivery_info.address.city,
     "state": req.body.fulfillment_info.delivery_info.address.state,
      "zip": req.body.fulfillment_info.delivery_info.address.zip_code,
      "country": "US"
  };

  
  let ounces = req.body.fulfillment_info.weight.oz
  let convertedToPounds = ounces/16
  
    let totalItems = req.body.fulfillment_info.weight.lbs + convertedToPounds

  var parcel = {
      "length": "5",
      "width": "5",
      "height": "5",
      "distance_unit": "in",
      "weight": totalItems,
      "mass_unit": "lb"
  };





var shipment = {
  "address_from": addressFrom,
  "address_to": addressTo,
  "parcels": [parcel],
};

console.log(shipment)





    let htmlBody2 = `<div style="background-color: #ffffff;padding: 20px 0 15px;text-align: center;"><h1 style="color: #000000 !important;font-size: 1.5rem;text-align: center;">`;
  

    htmlBody2 = htmlBody2 + `RETAIL ORDER RECEIVED</h1></div>`


  htmlBody2 = htmlBody2 + `<p style="text-align: center;margin: 0 auto;width: 100%;"><span style="font-size: 20px !important;">confirmation code: <b>${req.body.confirmation_code}</b></span><br/><br/>${req.body.fulfillment_info.delivery_info.address.address_line1}, ${req.body.fulfillment_info.delivery_info.address.address_line2}, ${req.body.fulfillment_info.delivery_info.address.city}, ${req.body.fulfillment_info.delivery_info.address.state}, ${req.body.fulfillment_info.delivery_info.address.zip_code}</p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
  for(let i = 0;i<req.body.charges.items.length;i++){
    htmlBody2 = htmlBody2 + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
  }
  
  htmlBody2 = htmlBody2 + '</ul>'

  let transactionEmail = ''
  shippo.transaction.create({
    "shipment": shipment,
    "carrier_account": "decbd7bf0e6e471b9184f2fe29a4076f",
    "servicelevel_token": "usps_priority"
  }, function(err, transaction) {
    // asynchronously called
  //  return transaction

  console.log('log transaction')
  console.log(transaction)
  //  htmlBody2 = htmlBody2 + transaction
  addShippingInfoToOrder(req.body.id,transaction)



   let transactionEmail = `tracking number: ${JSON.stringify(transaction.tracking_number)}<br>tracking information: ${JSON.stringify(transaction.tracking_url_provider)}<br>label: ${JSON.stringify(transaction.label_url)} <br>`

   var mailOptions4 = {
     from: 'orders@mamnoonrestaurant.com',
     to: 'joe@mamnoonrestaurant.com',
     // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
     subject: `label info.`,
     html: transactionEmail
     
     };
     
     

     transporter4.sendMail(mailOptions4, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });




     transactionEmail = transactionEmail + `tracking number: ${JSON.stringify(transaction.tracking_number)}<br>tracking information: ${JSON.stringify(transaction.tracking_url_provider)}<br>label: ${JSON.stringify(transaction.label_url)} <br>`


  });
  






  var mailOptions2 = {
    from: 'orders@mamnoonrestaurant.com',
    to: 'joe@mamnoonrestaurant.com',
    // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
    subject: `Retail Order Received SHIPPING REQUIRED`,
    html: transactionEmail
    };
    
  
  
  
    const sendMail2 = function(mailOptions2, transporter2) {
      console.log()
      return new Promise(function(resolve, reject) {
        transporter2.sendMail(mailOptions2, function(error, info) {
          if (error) {
            reject(error);
          } else {
            console.log('email sent')
            resolve(info);
          }
        });
      });
    };
  
    sendMail2(mailOptions2, transporter2)






}



async function retrieveCreatedLabel() {

  var addressFrom  = {
    "name": "sof elm",
    "company": "Mamnoon",
    "street1": "1508 Melrose Ave",
    "city": "Seattle",
    "state": "WA",
    "zip": "98112",
    "country": "US",
    "phone": "+1 425 442 9989",
    "email": "sofien@mamnoonrestaurant.com",
};

var addressTo = {
    "name": "joe waine",
    "company": "",
    "street1": "116 30th Ave",
    "street2": "",
    "city": "Seattle",
    "state": "WA",
    "zip": "98144",
    "country": "US",
    "phone": "+1 425 442 9308",
    "email": "joe@mamnoonrestaurant.com",
    "metadata": "Hippos dont lie"
};

var parcel = {
    "length": "5",
    "width": "5",
    "height": "5",
    "distance_unit": "in",
    "weight": "2",
    "mass_unit": "lb"
};

var shipment = {
    "address_from": addressFrom,
    "address_to": addressTo,
    "parcels": [parcel],
};

shippo.transaction.create({
    "shipment": shipment,
    "carrier_account": "decbd7bf0e6e471b9184f2fe29a4076f",
    "servicelevel_token": "usps_priority"
}, function(err, transaction) {
    // asynchronously called
    //  console.log(transaction)


    let transactionEmail = `tracking number: ${JSON.stringify(transaction.tracking_number)}<br>tracking information: ${JSON.stringify(transaction.tracking_url_provider)}<br>label: ${JSON.stringify(transaction.label_url)} <br>`

      var mailOptions4 = {
        from: 'orders@mamnoonrestaurant.com',
        to: 'joe@mamnoonrestaurant.com',
        // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
        subject: `label info.`,
        html: transactionEmail
        
        };
        
        

        transporter4.sendMail(mailOptions4, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });


















});
}






// retrieveCreatedLabel()



async function addShippingInfoToOrder(req,shippingInfoJSON) {

  console.log(req)
  console.log(shippingInfoJSON)

  try {
  
    await Order.updateOne(
        { upserveId: req },
        { $set: { shippingInfo: shippingInfoJSON } },
        {multi: true}
     )
    
  } catch (err) {
    console.log(err)
}

     };



app.post("/oloorder", function (req, res) {
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
      // console.log(response)
      if (resData.result === 'success') {
        res.send(req.body)

        let htmlBody = `<div style="background-color: #f05d5b;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;

        if(req.body.fulfillment_info.type === 'delivery'){
          htmlBody = htmlBody + `Your Delivery Order Has Been Received!</h1></div>`
        }else{
          htmlBody = htmlBody + `Your Pickup Order Has Been Received!</h1></div>`
        }
        
        htmlBody = htmlBody + `<p style="text-align: center;margin: 0 auto;width: 100%;"><br>Thanks for your order!<br>
        <br><span style="font-size: 20px !important;">confirmation code: <b>${req.body.confirmation_code}</b></span><br/><br/>Estimated pickup time is 10 - 20 minutes.</p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
        for(let i = 0;i<req.body.charges.items.length;i++){
          htmlBody = htmlBody + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
        }
        
        
        htmlBody = htmlBody + '</ul><br><p style="text-align: center;margin: 0 auto;width: 100%;">Thank you, Your friends at Mamnoon.<br><br><i>1508 Melrose Ave, Seattle WA 98122</i><br><a href="https://nadimama.com">nadimama.com</p>'
                
        
        var mailOptions = {
        from: 'orders@mamnoonrestaurant.com',
        to: req.body.fulfillment_info.customer.email,
        // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
        subject: `Your Mamnoon Pickup Order Has Been Placed! We will notify you when your food is being prepared.`,
        html: htmlBody 
        
        };
        
        

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });




        const number = phoneUtil.parseAndKeepRawInput(req.body.fulfillment_info.customer.phone, 'US');
        let smsNumber = phoneUtil.format(number, PNF.E164);








    // Send the text message.
    if(req.body.sms === true){
    client.messages.create({
      to: smsNumber,
      from: '+12062087871',
      body: 'Your Mamnoon Pickup Order Has Been Placed! We will notify you when your food is being prepared. Thank You.'
    });
  }




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
      // console.log(response)
      if (resData.result === 'success') {
        res.send(req.body)


        let htmlBody = `<div style="background-color: #f05d5b;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;

        if(req.body.fulfillment_info.type === 'delivery'){
          htmlBody = htmlBody + `Your Delivery Order Has Been Placed!</h1></div>`
        }else{
          htmlBody = htmlBody + `Your Pickup Order Has Been Placed!</h1></div>`
        }
        
        htmlBody = htmlBody + `<p style="text-align: center;margin: 0 auto;width: 100%;"><br>Thanks for your order!<br>
        <br><span style="font-size: 20px !important;">confirmation code: <b>${req.body.confirmation_code}</b></span><br/><br/>Estimated pickup time is 10 - 20 minutes.</p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
        for(let i = 0;i<req.body.charges.items.length;i++){
          htmlBody = htmlBody + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
        }
        
        
        htmlBody = htmlBody + '</ul><br><p style="text-align: center;margin: 0 auto;width: 100%;">Thank you, Your friends at Mamnoon Street.<br><br><i>2020 6th Ave, Seattle, WA 98121</i><br><a href="https://nadimama.com">nadimama.com</p>'
                
        
        var mailOptions = {
        from: 'orders@mamnoonrestaurant.com',
        to: req.body.fulfillment_info.customer.email,
        // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
        subject: `Your Mamnoon Street Pickup Order Has Been Placed! We will notify you when your food is being prepared.`,
        html: htmlBody 
        
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        const number = phoneUtil.parseAndKeepRawInput(req.body.fulfillment_info.customer.phone, 'US');
        let smsNumber = phoneUtil.format(number, PNF.E164);
     
        console.log('send text message - mamnoon street order ready')
        if(req.body.sms === true){
          client.messages.create({
            to: smsNumber,
            from: '+12062087871',
            body: `Your Mamnoon Street Pickup Order Has Been Placed! Estimated pickup time is 10 - 20 minutes.`
          });
        }

      }
    })
    .catch(function (error) {
      console.log(error)

    });
});








app.post("/oloordermbar", function (req, res) {
  console.log(req.body)
  axios.post('https://hq.breadcrumb.com/ws/v1/orders', req.body,
    {
      headers: {
          'X-Breadcrumb-Username': `generic-online-ordering_mbar`,
          'X-Breadcrumb-Password': '2yEULpqH426t',
          'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`  
      }
    })
    .then(function (response) {

      let resData = response.data
      // console.log(response)
      if (resData.result === 'success') {
        res.send(req.body)


        let htmlBody = `<div style="background-color: #f05d5b;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;

        if(req.body.fulfillment_info.type === 'delivery'){
          htmlBody = htmlBody + `Your Delivery Order Has Been Placed!</h1></div>`
        }else{
          htmlBody = htmlBody + `Your Pickup Order Has Been Placed!</h1></div>`
        }
        
        htmlBody = htmlBody + `<p style="text-align: center;margin: 0 auto;width: 100%;"><br>Thanks for your order!<br>
        <br><span style="font-size: 20px !important;">confirmation code: <b>${req.body.confirmation_code}</b></span><br/><br/>Estimated pickup time is 10 - 20 minutes.</p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
        for(let i = 0;i<req.body.charges.items.length;i++){
          htmlBody = htmlBody + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
        }
        
        
        htmlBody = htmlBody + '</ul><br><p style="text-align: center;margin: 0 auto;width: 100%;">Thank you, Your friends at Mbar.<br><br><i>400 Fairview Ave N 14th Floor, Seattle, WA 98109</i><br><a href="https://nadimama.com">nadimama.com</p>'
                
        
        var mailOptions = {
        from: 'orders@mamnoonrestaurant.com',
        to: req.body.fulfillment_info.customer.email,
        // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
        subject: `Your Mbar Pickup Order Has Been Placed! We will notify you when your food is being prepared.`,
        html: htmlBody 
        
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        const number = phoneUtil.parseAndKeepRawInput(req.body.fulfillment_info.customer.phone, 'US');
        let smsNumber = phoneUtil.format(number, PNF.E164);
     
        console.log('send text message - mbar order ready')
        if(req.body.sms === true){
          client.messages.create({
            to: smsNumber,
            from: '+12062087871',
            body: `Your Mbar Pickup Order Has Been Placed! Estimated pickup time is 10 - 20 minutes.`
          });
        }

      }
    })
    .catch(function (error) {
      console.log(error)

    });
});















app.post("/confirmationemail", function (req, res) {
  console.log(req.body)



        res.send(req.body)


        let htmlBody = `<div style="background-color: #f05d5b;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;

        if(req.body.fulfillment_info.type === 'delivery'){
          htmlBody = htmlBody + `Your Delivery Order Has Been Scheduled!</h1></div>`
        }else{
          htmlBody = htmlBody + `Your Pickup Order Has Been Scheduled!</h1></div>`
        }
        
        htmlBody = htmlBody + `<p style="text-align: center;margin: 0 auto;width: 100%;"><br>Thanks for your order!<br>
        <br><span style="font-size: 20px !important;">confirmation code: <b>${req.body.confirmation_code}</b></span><br/><br/>It will be ready on ${ moment(String(req.body.scheduled_time)).tz('America/Los_Angeles').format('llll').replace(', 2020', ', at') }</p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
        for(let i = 0;i<req.body.charges.items.length;i++){
          htmlBody = htmlBody + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
        }
        


        let addressToInsert = ''

        if(req.body.restaurant === "Mamnoon Street"){
            addressToInsert = '2020 6th Ave, Seattle, WA 98121'
        }
  
        if(req.body.restaurant === "Mamnoon"){
          addressToInsert = '1508 Melrose Ave, Seattle, WA 98122'
        }

        if(req.body.restaurant === "Mbar"){
          addressToInsert = '400 Fairview Ave N 14th Floor, Seattle, WA 98109'
        }

  
  
      htmlBody = htmlBody + `</ul><br><p style="text-align: center;margin: 0 auto;width: 100%;">Thank you, Your friends at ${req.body.restaurant}<br><br><i>${addressToInsert}</i><br><a href="https://nadimama.com">nadimama.com</p>`
              
            
        var mailOptions = {
        from: 'orders@mamnoonrestaurant.com',
        to: req.body.fulfillment_info.customer.email,
        // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
        subject: `Your Order Has Been Scheduled! We will notify you when your food is being prepared.`,
        html: htmlBody 
        
        };
        


        

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        const number = phoneUtil.parseAndKeepRawInput(req.body.fulfillment_info.customer.phone, 'US');
      let smsNumber = phoneUtil.format(number, PNF.E164);



      console.log('send text message - confrimation email')
          if(req.body.sms === true){
    client.messages.create({
    to: smsNumber,
    from: '+12062087871',
    body: `Your Order Has Been Scheduled! it will be ready on ${moment(String(req.body.scheduled_time)).tz('America/Los_Angeles').format('llll').replace(', 2020', ', at') }`
    });
    }

 


});




















async function orderPostedTrue(idToClose) {

  try {
  
    await Order.updateOne(
        { upserveId: idToClose },
        { $set: { orderPosted : true } },
        {multi: true}
     )
    
  } catch (err) {
    console.log(err)
    }
  }


async function updateToStatusClosed(idToClose) {

try {

  await Order.updateOne(
      { upserveId: idToClose },
      { $set: { status : "Closed" } },
      {multi: true}
   )
  
} catch (err) {
  console.log(err)
  }
}



async function updateToStatusAccepted(idToAccept) {
console.log('update to accepted')
  try {
  
    await Order.updateOne(
        { upserveId: idToAccept },
        { $set: { orderAccepted: true } },
        {multi: true}
     )
    
  } catch (err) {
    console.log(err)
    }
  }


async function queryOrders(closedOrders) {
console.log('queryorders')
console.log(closedOrders)
  try {
    let docs = await Order.find({ upserveId: { $in: closedOrders }, status: "Open" })

    console.log('docs in query')
    console.log(docs)
      for(let i = 0;i<docs.length;i++){
      sendReadyEmail(docs[i].upserveId)
    }

} catch (err) {
  console.log(err)
  }
}


async function queryOrdersToAccept(closedOrders) {

  try {
    let docs = await Order.find({ upserveId: { $in: closedOrders }, status: "Open", orderAccepted: false })
    
    console.log('docs queryOrdersToAccept')
    console.log(docs)

    for(let i = 0;i<docs.length;i++){
      sendAcceptanceEmail(docs[i].upserveId)
    }

} catch (err) {
  console.log(err)
  }
}


async function sendAcceptanceEmail(upserveId) {
console.log('send acceptance email')
  try {

  let doc = await Order.find({ "upserveId": upserveId });

  console.log('you retrievced it right')
    // console.log(doc)

    let htmlBody = `<div style="background-color: #000099;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;

    if(doc[0].orderInfo.fulfillment_info.type === 'delivery'){
      htmlBody = htmlBody + `Your Order Has Been Accepted.</h1></div>`
    }else{
      htmlBody = htmlBody + `Your Order Has Been Accepted.</h1></div>`
    }
    
    htmlBody = htmlBody + `<p style="text-align: center;margin: 0 auto;width: 100%;"><br>Your ticket has been opened and your food is being prepared.<br>
    <br><span style="font-size: 20px !important;">confirmation code: <b>${doc[0].orderInfo.confirmation_code}</b></span><br/><br/></p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
    for(let i = 0;i<doc[0].orderInfo.charges.items.length;i++){
      htmlBody = htmlBody + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(doc[0].orderInfo.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(doc[0].orderInfo.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(doc[0].orderInfo.charges.items[i].quantity) +'</li>'
    }
    
    let addressToInsert = ''

    if(doc[0].orderInfo.restaurant === "Mamnoon Street"){
        addressToInsert = '2020 6th Ave, Seattle, WA 98121'
    }

    if(doc[0].orderInfo.restaurant === "Mamnoon"){
      addressToInsert = '1508 Melrose Ave, Seattle, WA 98122'
    }

    htmlBody = htmlBody + `</ul><br><p style="text-align: center;margin: 0 auto;width: 100%;">Thank you, Your friends at ${doc[0].orderInfo.restaurant}<br><br><i>${addressToInsert}</i><br><a href="https://nadimama.com">nadimama.com</p>`
       
    var mailOptions = {
    from: 'orders@mamnoonrestaurant.com',
    to: doc[0].orderInfo.fulfillment_info.customer.email,
    // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
    subject: `Your order has been accepted.`,
    html: htmlBody
    
    };

  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
    const number = phoneUtil.parseAndKeepRawInput(doc[0].orderInfo.fulfillment_info.customer.phone, 'US');
    let smsNumber = phoneUtil.format(number, PNF.E164);

    console.log('order accepted food now prepared')
    if(doc[0].orderInfo.sms === true){

    client.messages.create({
      to: smsNumber,
      from: '+12062087871',
      body: `Your order has been accepted and is now being prepared.`
    });
  }
   
updateToStatusAccepted(upserveId)
    
} catch (err) {
console.log(err)
}

}





async function sendReadyEmail(upserveId) {

console.log('sendemail')
  try {
  let doc = await Order.find({ "upserveId": upserveId });

  console.log('you retrievced it right')
    // console.log(doc)



    



    let htmlBody = `<div style="background-color: #009900;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;

    // if(doc[0].orderInfo.fulfillment_info.type === 'delivery'){
      // htmlBody = htmlBody + `Your ${doc[0].orderInfo.restaurant} Delivery Order Is Ready!</h1></div>`
    // }else{
      htmlBody = htmlBody + `Your ${doc[0].orderInfo.restaurant} Order Is Ready!</h1></div>`
    // }
    
    htmlBody = htmlBody + `<p style="text-align: center;margin: 0 auto;width: 100%;"><br>Thanks for your order!<br>
    <br><span style="font-size: 20px !important;">confirmation code: <b>${doc[0].orderInfo.confirmation_code}</b></span><br/><br/></p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
    for(let i = 0;i<doc[0].orderInfo.charges.items.length;i++){
      htmlBody = htmlBody + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(doc[0].orderInfo.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(doc[0].orderInfo.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(doc[0].orderInfo.charges.items[i].quantity) +'</li>'
    }
    
    
      let addressToInsert = ''

      if(doc[0].orderInfo.restaurant === "Mamnoon Street"){
          addressToInsert = '2020 6th Ave, Seattle, WA 98121'
      }

      if(doc[0].orderInfo.restaurant === "Mamnoon"){
        addressToInsert = '1508 Melrose Ave, Seattle, WA 98122'
      }




    htmlBody = htmlBody + `</ul><br><p style="text-align: center;margin: 0 auto;width: 100%;">Thank you, Your friends at ${doc[0].orderInfo.restaurant}<br><br><i>${addressToInsert}</i><br><a href="https://nadimama.com">nadimama.com</p>`
            

    var mailOptions = {
    from: 'orders@mamnoonrestaurant.com',
    to: doc[0].orderInfo.fulfillment_info.customer.email,
    // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
    subject: `Your ${doc[0].orderInfo.restaurant} Order Is Ready!`,
    html: htmlBody
    
    };

  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
    const number = phoneUtil.parseAndKeepRawInput(doc[0].orderInfo.fulfillment_info.customer.phone, 'US');
    let smsNumber = phoneUtil.format(number, PNF.E164);




    console.log('send email when ready')
    if(doc[0].orderInfo.sms === true){

    client.messages.create({
      to: smsNumber,
      from: '+12062087871',
      body: `Your ${doc[0].orderInfo.restaurant} Pickup Order Is Ready!`
    });
  }
     updateToStatusClosed(upserveId)


} catch (err) {
console.log(err)
}




}





async function checkCheckStatusStreet () {
  let order = moment().tz("America/Los_Angeles").format('YYYYMMDD');
  try {


    
    let request = await fetch(`https://api.breadcrumb.com/ws/v2/checks.json?date=${order}`, {
      headers: {
        'X-Breadcrumb-Username': `joe-waine_mamnoon-street`,
        'X-Breadcrumb-Password': 'H227s3CADgg4',
        'X-Breadcrumb-API-Key': `6110e294b8984840d2c10472bbed3453`  
      }
    })
    if (request.ok) { 
      let body = await request.json();


     let closedOnlineOrders = body.objects.filter(function(x){return x.hasOwnProperty('online_order')}).filter(function(x){return x.status ==='Closed' }).map(function(x){return x.online_order.id })
     

    //  let closedOnline = body.objects.filter(function(x){return x.hasOwnProperty('online_order')}).filter(function(x){return x.status ==='Closed' })
    // console.log(closedOnline)
    //get list of ids of checks from today, return all with status of closed
     queryOrders(closedOnlineOrders)

    }
  } catch (err) {
  console.log(err)
  console.log('failure')
  }
}





async function checkCheckStatus () {
  let order = moment().tz("America/Los_Angeles").format('YYYYMMDD');
  try {
    let request = await fetch(`https://api.breadcrumb.com/ws/v2/checks.json?date=${order}`, {
      headers: {
        'X-Breadcrumb-Username': `joe-waine_mamnoon-llc`,
        'X-Breadcrumb-Password': 'sbkh_Qgs4HMB',
        'X-Breadcrumb-API-Key': `6110e294b8984840d2c10472bbed3453`  
      }
    })
    if (request.ok) { 
      let body = await request.json();


     let closedOnlineOrders = body.objects.filter(function(x){return x.hasOwnProperty('online_order')}).filter(function(x){return x.status ==='Closed' }).map(function(x){return x.online_order.id })
     console.log('closedOnlineOrders')
     console.log(closedOnlineOrders)
     queryOrders(closedOnlineOrders)

    }
  } catch (err) {
  console.log(err)
  console.log('failure')
  }
}






async function postOrder(req, res) {
  axios.post('https://hq.breadcrumb.com/ws/v1/orders', req,
    {
      headers: {
        'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-llc`,
        'X-Breadcrumb-Password': 'uQM8mseTvnTX',
        'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`
      }
    })
    .then(function (response) {
      let resData = response.data
      // console.log(response)
      if (resData.result === 'success') {

        // res.send(req)
let j = 0
        if(j === 0){
          console.log(req)
                      console.log(resData.result)
                      let htmlBody = `<div style="background-color: #f05d5b;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;

                      if(req.fulfillment_info.type === 'delivery'){
                        htmlBody = htmlBody + `Your Delivery Order Has Been Received!</h1></div>`
                      }else{
                        htmlBody = htmlBody + `Your Pickup Order Has Been Received!</h1></div>`
                      }
                      
                      htmlBody = htmlBody + `<p style="text-align: center;margin: 0 auto;width: 100%;"><br>Thanks for your order!<br>
                      <br><span style="font-size: 20px !important;">confirmation code: <b>${req.confirmation_code}</b></span><br/><br/>Estimated pickup time is 10 - 20 minutes.</p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
                      for(let i = 0;i<req.charges.items.length;i++){
                        htmlBody = htmlBody + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(req.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.charges.items[i].quantity) +'</li>'
                      }
                      

                      let addressToInsert = ''

                      if(req.restaurant === "Mamnoon Street"){
                          addressToInsert = '2020 6th Ave, Seattle, WA 98121'
                      }
                
                      if(req.restaurant === "Mamnoon"){
                        addressToInsert = '1508 Melrose Ave, Seattle, WA 98122'
                      }
                

                      
                      htmlBody = htmlBody + `</ul><br><p style="text-align: center;margin: 0 auto;width: 100%;">Thank you, Your friends at Mamnoon Street.<br><br><i>${addressToInsert}</i><br><a href="https://nadimama.com">nadimama.com</p>`
                              
                      
                      var mailOptions2 = {
                      from: 'orders@mamnoonrestaurant.com',
                      to: req.fulfillment_info.customer.email,
                      // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
                      subject: `Your Mamnoon Pickup Order Has Been Placed! We will notify you when your food is being prepared.`,
                      html: htmlBody 
                      
                      };
                    
                      const sendMail = function(mailOptions2, transporter2) {
                        console.log()
                        return new Promise(function(resolve, reject) {
                          transporter2.sendMail(mailOptions2, function(error, info) {
                            if (error) {
                              reject(error);
                            } else {
                              console.log('email sent')
                              resolve(info);
                            }
                          });
                        });
                      };

                      sendMail(mailOptions2, transporter2)

                      const number = phoneUtil.parseAndKeepRawInput(req.fulfillment_info.customer.phone, 'US');
                      let smsNumber = phoneUtil.format(number, PNF.E164);
                
                      // Send the text message.
                      if(req.sms === true){
                        console.log('send text message')
                      client.messages.create({
                        to: smsNumber,
                        from: '+12062087871',
                        body: 'Your Mamnoon Order Has Been Placed! We will notify you when your food is being prepared.'
                      });
                    }
                    orderPostedTrue(req.id)


                    j = 1
                  }
      }
    })
    .catch(function (error) {
      console.log(error)
    });

}

















async function postStreetOrder(req, res) {
  console.log(req)
    axios.post('https://hq.breadcrumb.com/ws/v1/orders', req,
      {
        headers: {
          'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-street`,
          'X-Breadcrumb-Password': 'TJzwaP8uguyy',
          'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`
        }
      })
      .then(function (response) {
  
        let resData = response.data
        // console.log(response)
        if (resData.result === 'success') {
          // res.send(req)
          console.log(resData.result)
          let htmlBody = `<div style="background-color: #f05d5b;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;
  
          if(req.fulfillment_info.type === 'delivery'){
            htmlBody = htmlBody + `Your Mamnoon Street Delivery Order Has Been Received!</h1></div>`
          }else{
            htmlBody = htmlBody + `Your Mamnoon Street Pickup Order Has Been Received!</h1></div>`
          }
          
          htmlBody = htmlBody + `<p style="text-align: center;margin: 0 auto;width: 100%;"><br>Thanks for your order!<br>
          <br><span style="font-size: 20px !important;">confirmation code: <b>${req.confirmation_code}</b></span><br/><br/>Estimated pickup time is 10 - 20 minutes.</p><br/><ul style="padding-left: 0 !important;margin-left:0 !important;list-style-type:none !important;"">`
          for(let i = 0;i<req.charges.items.length;i++){
            htmlBody = htmlBody + '<li style="padding-left: 0 !important;margin-left:0 !important;text-align: center;width: 100%;list-style-type:none !important;">' + JSON.stringify(req.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.charges.items[i].price)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.charges.items[i].quantity) +'</li>'
          }
          
  
          let addressToInsert = ''
  
          if(req.restaurant === "Mamnoon Street"){
              addressToInsert = '2020 6th Ave, Seattle, WA 98121'
          }
    
          if(req.restaurant === "Mamnoon"){
            addressToInsert = '1508 Melrose Ave, Seattle, WA 98122'
          }
    
  
          
          htmlBody = htmlBody + `</ul><br><p style="text-align: center;margin: 0 auto;width: 100%;">Thank you, Your friends at Mamnoon Street.<br><br><i>${addressToInsert}</i><br><a href="https://nadimama.com">nadimama.com</p>`
                  
          
          var mailOptions = {
          from: 'orders@mamnoonrestaurant.com',
          to: req.fulfillment_info.customer.email,
          // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
          subject: `Your Mamnoon Street Pickup Order Has Been Placed! We will notify you when your food is being prepared.`,
          html: htmlBody 
          
          };
          
          
  
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
  
  
  
  
          const number = phoneUtil.parseAndKeepRawInput(req.fulfillment_info.customer.phone, 'US');
          let smsNumber = phoneUtil.format(number, PNF.E164);
  

          console.log('Your Mamnoon Street Pickup Order Has Been Placed!')
  
      // Send the text message.
      if(req.sms === true){
      client.messages.create({
        to: smsNumber,
        from: '+12062087871',
        body: 'Your Mamnoon Street Pickup Order Has Been Placed!'
      });
    }
        orderPostedTrue(req.id)
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  
  }





























async function placeScheduledOrders() {
  try {

let docs = await Order.find({ "orderInfo.preorder" : true , "orderPosted" : false })
let outcome = docs.map(function(x){
  return {
    id: x.orderInfo.id,
    preorder: x.orderInfo.preorder,
    scheduled_time:  x.orderInfo.scheduled_time
  }
})

// console.log('outcome')
// console.log(outcome)
for(let i = 0; i < outcome.length; i++){
  console.log(i)
  let date = new Date(outcome[i].scheduled_time); // some mock date
  let milliseconds = date.getTime();

  let arrival = milliseconds - Date.now() - 2700000

  if(arrival < 0){
    if(docs[i].orderPosted === false){

      if(docs[i].orderInfo.restaurant === 'Mamnoon'){
        postOrder(docs[i].orderInfo)
      }else{
        postStreetOrder(docs[i].orderInfo)
      }

    }
  }
}

} catch (err) {
  console.log(err)
  }


}


async function acceptedOrderNotify() {

  let order = moment().tz("America/Los_Angeles").format('YYYYMMDD');
  try {
    let request = await fetch(`https://api.breadcrumb.com/ws/v2/checks.json?date=${order}`, {
      headers: {
        'X-Breadcrumb-Username': `joe-waine_mamnoon-llc`,
        'X-Breadcrumb-Password': 'sbkh_Qgs4HMB',
        'X-Breadcrumb-API-Key': `6110e294b8984840d2c10472bbed3453`  
      }
    })
    if (request.ok) { 
      let body = await request.json();


     let accepted = body.objects.filter(function(x){return x.hasOwnProperty('online_order')}).filter(function(x){return x.status ==='Open' }).map(function(x){return x.online_order.id })
    
    //  console.log('accepted')
    //  console.log(accepted)

     queryOrdersToAccept(accepted)

    }
  } catch (err) {
  console.log(err)
  console.log('failure')
  }
}

cron.schedule('*/10 * * * * *', () => {
  checkCheckStatus()
  checkCheckStatusStreet()
  placeScheduledOrders()
  acceptedOrderNotify()
});


  // app.get(`/shippingcalculation`, async function(req,res) {
  //   fetch('https://secure.shippingapis.com/shippingapi.dll?API=RateV4&XML=<RateV4Request USERID="099MAMNO1149"><Revision>2</Revision><Package ID="1ST"><Service>PRIORITY</Service><ZipOrigination>'+ req.query.ZipOrigination +'</ZipOrigination><ZipDestination>'+ req.query.ZipDestination +'</ZipDestination><Pounds>'+ req.query.Pounds +'</Pounds><Ounces>'+ req.query.Ounces +'</Ounces><Container></Container><Width></Width><Length></Length><Height></Height><Girth></Girth><Machinable>false</Machinable></Package></RateV4Request>')
  //   .then(response => response.text())
  //   .then(str => (parser).parseFromString(str, "text/xml"))
  //   .then(str => parseString(str.rawHTML, function (err, result) {
  //     // res.send(result.RateV4Response.Package[0].Postage);
  //     res.send(JSON.stringify(result.RateV4Response.Package[0].Postage));
  // }) )
  // });



  app.get(`/shippingcalculation`, async function(req,res) {

    // console.log(JSON.parse(req.query.orderInfo).fulfillment_info.delivery_info.address)

    // console.log(JSON.parse(req.query.orderInfo).fulfillment_info.delivery_info.address))

    
    var addressFrom = {
      "name": "Nadi mama",
      "street1": "1508 Melrose Ave",
      "city": "Seattle",
      "state": "WA",
      "zip": "98122",
      "country": "US"
  };
  

    var addressTo = {
      "name": JSON.parse(req.query.orderInfo).fulfillment_info.customer.first_name,
      "street1": JSON.parse(req.query.orderInfo).fulfillment_info.delivery_info.address.address_line1,
      "city": JSON.parse(req.query.orderInfo).fulfillment_info.delivery_info.address.city,
     "state": JSON.parse(req.query.orderInfo).fulfillment_info.delivery_info.address.state,
      "zip": JSON.parse(req.query.orderInfo).fulfillment_info.delivery_info.address.zip_code,
      "country": "US"
  };


  JSON.parse(req.query.Pounds)
  let ounces = JSON.parse(req.query.Ounces)
  let convertedToPounds = ounces/16
  

let totalItems = JSON.parse(req.query.Pounds) + convertedToPounds

  var parcel = {
      "length": "5",
      "width": "5",
      "height": "5",
      "distance_unit": "in",
      "weight": totalItems,
      "mass_unit": "lb"
  };
  
  shippo.shipment.create({
      "address_from": addressFrom,
      "address_to": addressTo,
      "parcels": [parcel],
      "async": false
  }, function(err, shipment){
      // asynchronously called

// console.log(shipment)

      res.send(JSON.stringify(shipment));

  });
  

   });





   let orderInfoObject = {
    "_id": "5ffe0bbdf456a45deff2bb5d",
    "email": "joe.waine@gmail.com",
    "payInfo": {
      "accountCardType": "VS",
      "accountEntryMethod": "Keyed",
      "accountExpiryDate": "0421",
      "amount": "33.44",
      "amountBalance": "",
      "amountProcessed": "33.44",
      "amountTipped": "0.00",
      "approvalNumberResult": "130895",
      "avsResponseCode": "Y",
      "avsResponseText": "Address: Match & 5 Digit Zip: Match",
      "batchNumber": "1",
      "billingName": "joseph p waine",
      "cashier": "",
      "cvvResponseCode": "N",
      "cvvResponseText": "No Match",
      "externalTransactionId": "51443e40-51d8-4e73-8c0f-7042683eab0a",
      "isPartialApproval": false,
      "maskedAccount": "************9016",
      "resultMessage": "Approved",
      "resultStatus": "true",
      "transactionReference": "",
      "transactionType": "CreditSale",
      "uniqueTransId": "fe6c412b7cee438cad0b956624f9d26a-a109feb7f21d4ec7ac9af5febaff7531"
    },
    "orderInfo": {
      "tipSelected": 0,
      "currentAmountToAddCustom": 0,
      "sms": true,
      "restaurant": "Mamnoon",
      "billing": {
        "billing_name": "joseph p waine",
        "billing_address": "2412 West Lynn Place ",
        "billing_postal_code": "98199"
      },
      "id": "lypyc2584os_hi8mlmlwilu_vmuuhzzbw6",
      "preorder": false,
      "scheduled_time": null,
      "time_placed": "2021-01-12T20:50:41.606Z",
      "confirmation_code": "mamnoon-p6u56qi5rln",
      "charges": {
        "shipping": "7.02",
        "total": 2642,
        "preTotal": 2400,
        "fees": 0,
        "taxes": 242,
        "tip": {
          "amount": 0,
          "payment_type": "Generic Online Ordering Integrated"
        },
        "items": [
          {
            "name": "Aleppo Jar",
            "cartId": "6wxxbg893fa_rpcx6razs5_up9o1e7i7tl",
            "item_id": "7fefad67-c1f5-4346-ab9b-f9c5d9586476",
            "price": 800,
            "price_cents": 800,
            "quantity": 3,
            "instructions": "",
            "modifiers": [],
            "sides": [],
            "lbs": 12,
            "oz": 75,
            "shippable": true,
            "height": "5",
            "width": "5",
            "length": "5",
            "girth": "55"
          }
        ]
      },
      "fulfillment_info": {
        "weight": {
          "lbs": 12,
          "oz": 75
        },
        "type": "delivery",
        "estimated_fulfillment_time": "2021-01-12T20:50:41.606Z",
        "customer": {
          "email": "joe.waine@gmail.com",
          "phone": "4254429308",
          "first_name": "joseph p waine"
        },
        "instructions": "",
        "no_tableware": false,
        "delivery_info": {
          "is_managed_delivery": false,
          "address": {
            "city": "Seattle",
            "state": "Washington",
            "zip_code": "98199",
            "address_line1": "2412 West Lynn Place",
            "address_line2": ""
          }
        }
      },
      "payments": {
        "payments": [
          {
            "payment_type": "Generic Online Ordering Integrated",
            "amount": 2642
          }
        ]
      }
    },
    "void": false,
    "uniqueTransId": "giftcard",
    "upserveId": "lypyc2584os_hi8mlmlwilu_vmuuhzzbw6",
    "status": "Closed",
    "orderPosted": false,
    "orderAccepted": true,
    "shippingOrder": true,
    "shipped": true,
    "shippingInfo": {
      "object_state": "VALID",
      "status": "SUCCESS",
      "object_created": "2021-01-12T20:51:12.272Z",
      "object_updated": "2021-01-12T20:51:13.858Z",
      "object_id": "8251df1b92d64ac188b3a6a7b1e3bb9e",
      "object_owner": "joe@mamnoonrestaurant.com",
      "test": true,
      "rate": {
        "object_id": "85f6a43640a245c89fcadab7bc09aa0e",
        "amount": "7.02",
        "currency": "USD",
        "amount_local": "7.02",
        "currency_local": "USD",
        "provider": "USPS",
        "servicelevel_name": "Priority Mail",
        "servicelevel_token": "usps_priority",
        "carrier_account": "decbd7bf0e6e471b9184f2fe29a4076f"
      },
      "tracking_number": "92055901755477000000000015",
      "tracking_status": "UNKNOWN",
      "eta": null,
      "tracking_url_provider": "https://tools.usps.com/go/TrackConfirmAction_input?origTrackNum=92055901755477000000000015",
      "label_url": "https://deliver.goshippo.com/8251df1b92d64ac188b3a6a7b1e3bb9e.pdf?Expires=1642020673&Signature=EH3rpV3NBfYE4lhx3ew~XQr8x4TuohGzeenCQDKoTsdAZVOptOoDCJGPeZTz7-2VOKnd4znkfjdjV2ALr3qOIQz9kY9QogWcWKEB5izsUuW1nXz-Cl3WM0cinx1BgXtoKBLyR~5sBCVKV5moMl~autbACLNGfaBD7~0ORWmlx6bEBN~C4L7juRlv1IEPdSMYloHC7E2I2WpFbVLw2DmY0uBZWyBoP72O7sEj1Xm1eEnZmuxHeD3k8umpls7rkPLK8J7MH7QmaTn3ioz7B2fQzMsWliDHDRh0q11fY3-k9SJvNHcbvKvJq4jQwuB2-SxrotQHVFJa3SGhIEsSMZ6YEA__&Key-Pair-Id=APKAJRICFXQ2S4YUQRSQ",
      "commercial_invoice_url": null,
      "messages": [],
      "order": null,
      "metadata": "",
      "parcel": "cee3c43e66c04a23987205d4bad2a991",
      "billing": {
        "payments": []
      },
      "qr_code_url": null
    },
    "__v": 0
  }
  
  

  
  
