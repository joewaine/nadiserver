const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
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
const app = express();
const nodemailer = require('nodemailer');



var sdk = require("emergepay-sdk");

// app.use(cors({
//   origin: 'https://www.nadimama.com'
// }));
const { createProxyMiddleware } = require('http-proxy-middleware');


// app.use(cors());
// app.options('*', cors())

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});



//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
// .connect(config.database, { useNewUrlParser: true })
mongoose
.connect('mongodb+srv://joe:MontBlanc7098!!@cluster0-9hdl4.mongodb.net/authapp?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    // console.log("Database is connected");
  })
  .catch(err => {
    // console.log({ database_error: err });
  });


console.log(cors)



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

const tockRoutes = require("./api/tock/route/tock"); //bring in our tock routes
const e = require("express");

app.use("/tock", tockRoutes);



//Ensure that you replace these with valid values before trying to issue a request
var oid = "1517492274";
var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOjMwNywib2lkIjoxNTE3NDkyMjc0LCJ0b2tlbl91c2UiOiJvcnQiLCJybmQiOjEyOTgyMzk1ODYuMDY0MjgyNCwiZ3JvdXBzIjpbIk9yZ0FQSVVzZXJzIl0sImlhdCI6MTU5OTI1ODg3MH0.zaMi_DDPspTKW6fl2utCGKXwdQT-Q39DKrFOhXxCHA4";
var environmentUrl = "https://api.emergepay-sandbox.chargeitpro.com/virtualterminal/v1";
// var environmentUrl = "https://nadimama.com/mamnoon";
var emergepay = new sdk.emergepaySdk({ oid: oid, authToken: authToken, environmentUrl: environmentUrl });


// orgs/1517492274/transactions/start

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//The client side can hit this endpoint by issuing a POST request to
//localhost:5555/start-transaction
//base_amount and external_tran_id are required in the fields array.
app.post("/start-transaction", function (req, res) {
let amount = Number(req.body.charges.total)
let finalAmount = amount
let finalCash = finalAmount/100
let config = {
    transactionType: sdk.TransactionType.CreditSale,
    // method: "hostedFields",
    method: "modal",
    fields: [
        {
            id: "base_amount",
            value: finalCash.toString()
        },
        {
          id: "billing_name",
          value: req.body.billing.billing_name
        },
        {
        id: "billing_address",
        value: req.body.billing.billing_address
        },
        {
            id: "billing_postal_code",
            value: req.body.billing.billing_postal_code
        },
        {
            id: "external_tran_id",
            value: emergepay.getExternalTransactionId()
        }
    ]
};


  
    emergepay.startTransaction(config)
    .then(function (transactionToken) {
      // console.log('success')
      // console.log(transactionToken)
        res.send({
            transactionToken: transactionToken
        });
    })
    .catch(function (err) {
      console.log('error')
        res.send(err.message);
    });
});

console.log(PORT);


// emerge pay stuff
// emerge pay stuff
// emerge pay stuff

app.listen(PORT, () => {
  // console.log(`App is running on ${PORT}`);
});


let postOnlineOrder = async (req, res) => {
  
  


  
console.log(345)
  
  axios.post('https://hq.breadcrumb.com/ws/v1/orders', req,
  {
  headers: {
    'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-llc`,
    'X-Breadcrumb-Password': 'uQM8mseTvnTX',
    'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`

}})
     .then(function (res) {
        console.log(res.data)
     })
     .catch(function (error) {
       console.log(error)
     });


         
       }
       

       var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'joe@mamnoonrestaurant.com',
          pass: 'Montebello7098!!'
        }
      });




      app.post("/oloorder", function (req, res) {

             axios.post('https://hq.breadcrumb.com/ws/v1/orders', req.body,
              {headers: {
                'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-llc`,
                'X-Breadcrumb-Password': 'uQM8mseTvnTX',
                'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`
                }})
                 .then(function (response) {

                  let resData = response.data
                  console.log(response)
                  if(resData.result === 'success'){


                    // xxx
                    res.send(req.body)


                      let htmlBody = '<ul>'

                      for(let i = 0;i<req.body.charges.items.length;i++){

                        htmlBody = htmlBody + '<li>' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price) +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
                        

                      }
                      
                      htmlBody = htmlBody + '</ul>'



                      // "name":"961 Lebanese Pale Ale","price":800,quantity":1


                    var mailOptions = {
                      from: 'joe@mamnoonrestaurant.com',
                      to: req.body.fulfillment_info.customer.email,
                      // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
                      subject: 'Your Mamnoon Order Has Been Received!',
                      // html: '<pre>'+JSON.stringify(req.body.charges.items)+'</pre>'
                      
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                      }
                    });
// xxx
                  }else{
                    res.send('result not success')

                    res.send(req.body)


                      let htmlBody = '<ul>'

                      for(let i = 0;i<req.body.charges.items.length;i++){

                        htmlBody = htmlBody + '<li>' + JSON.stringify(req.body.charges.items[i].name) + '&nbsp;<b>$'+ JSON.stringify(req.body.charges.items[i].price).toFixed(2)/100 +'</b>&nbsp;x&nbsp;'+ JSON.stringify(req.body.charges.items[i].quantity) +'</li>'
                        

                      }
                      
                      htmlBody = htmlBody + '</ul>'

console.log(htmlBody)

                      // "name":"961 Lebanese Pale Ale","price":800,quantity":1


                    var mailOptions = {
                      from: 'joe@mamnoonrestaurant.com',
                      to: req.body.fulfillment_info.customer.email,
                      // to: 'wassef@mamnoonrestaurant.com, sofien@mamnoonrestaurant.com, joe.waine@gmail.com',
                      subject: 'Your Mamnoon Order Has Been Received!',
                      html: '<pre>'+JSON.stringify(req.body.charges.items)+'</pre>'
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                      }
                    });



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