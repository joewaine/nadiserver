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

const moment = require('moment')
const tz = require('moment-timezone')



const Order = require("./api/order/model/Order");

const nodemailer = require('nodemailer');
const nodemailer2 = require('nodemailer');
const twilio = require('twilio');

const PNF = require('google-libphonenumber').PhoneNumberFormat;

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();



// let client = new twilio('AC47c2d4df4e5ae7089fdd1e148308439e', 'f28ed5eef0ac3f7bcb23d40f071974e3');
let client = new twilio('AC47c2d4df4e5ae7089fdd1e148308439e', 'be0f04caeae8e2ac0e2abad0886bfccd');




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


// production
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



        console.log(req.body.fulfillment_info.customer.phone)
        const number = phoneUtil.parseAndKeepRawInput(req.body.fulfillment_info.customer.phone, 'US');
        let smsNumber = phoneUtil.format(number, PNF.E164);
        console.log(smsNumber)







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

        const number = phoneUtil.parseAndKeepRawInput(doc[0].orderInfo.fulfillment_info.customer.phone, 'US');
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
  try {
    let docs = await Order.find({ upserveId: { $in: closedOrders }, status: "Open" })

    for(let i = 0;i<docs.length;i++){
      sendEmail(docs[i].upserveId)
    }

} catch (err) {
  console.log(err)
  }
}


async function queryAcceptedOrders(closedOrders) {

  try {
    let docs = await Order.find({ upserveId: { $in: closedOrders }, status: "Open", orderAccepted: false })

    console.log('query accepted orders')
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
    subject: `Your order has been accepted and your food is now being prepared.`,
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
      body: `Your order has been accepted and your food is now being prepared.`
    });
  }


     updateToStatusAccepted(upserveId)

    

} catch (err) {
console.log(err)
}

}





async function sendEmail(upserveId) {
console.log('sendemail')
  try {

  let doc = await Order.find({ "upserveId": upserveId });

  console.log('you retrievced it right')
    // console.log(doc)



    



    let htmlBody = `<div style="background-color: #009900;padding: 20px 0 15px;text-align: center;"><h1 style="color: #fff367 !important;font-size: 1.5rem;text-align: center;">`;

    if(doc[0].orderInfo.fulfillment_info.type === 'delivery'){
      htmlBody = htmlBody + `Your ${doc[0].orderInfo.restaurant} Delivery Order Is Ready!</h1></div>`
    }else{
      htmlBody = htmlBody + `Your ${doc[0].orderInfo.restaurant} Pickup Order Is Ready!</h1></div>`
    }
    
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
                        body: 'Your Mamnoon Pickup Order Has Been Placed! We will notify you when your food is being prepared.'
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
console.log('placeScheduledOrders')
  try {

let docs = await Order.find({ "orderInfo.preorder" : true , "orderPosted" : false })
let outcome = docs.map(function(x){
  return {
    id: x.orderInfo.id,
    preorder: x.orderInfo.preorder,
    scheduled_time:  x.orderInfo.scheduled_time
  }
})

 console.log(outcome)
for(let i = 0; i < outcome.length; i++){
  console.log(i)
  let date = new Date(outcome[i].scheduled_time); // some mock date
  let milliseconds = date.getTime();

  //// (minus 2700000) is 45 minutes prior

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
    
     console.log('accepted')
     console.log(accepted)

     queryAcceptedOrders(accepted)

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
