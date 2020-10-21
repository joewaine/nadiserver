const Order = require("../model/Order");
const fetch = require("node-fetch");
const btoa = require('btoa');
const axios = require('axios');
const e = require("express");


var sdk = require("emergepay-sdk");

var oid = "1517492274";
var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOjMwNywib2lkIjoxNTE3NDkyMjc0LCJ0b2tlbl91c2UiOiJvcnQiLCJybmQiOjEyOTgyMzk1ODYuMDY0MjgyNCwiZ3JvdXBzIjpbIk9yZ0FQSVVzZXJzIl0sImlhdCI6MTU5OTI1ODg3MH0.zaMi_DDPspTKW6fl2utCGKXwdQT-Q39DKrFOhXxCHA4";
var environmentUrl = "https://api.emergepay-sandbox.chargeitpro.com/virtualterminal/v1";
var emergepay = new sdk.emergepaySdk({ oid: oid, authToken: authToken, environmentUrl: environmentUrl });

  
  exports.tokenizedReturn = function (req, res) {


  


    // Ensure that you supply a valid uniqueTransId before trying to run the tokenized payment.
    emergepay.tokenizedRefundTransaction({
      uniqueTransId: req.body.uniqueTransId,
      externalTransactionId: emergepay.getExternalTransactionId(),
      amount: "0.01"
    })
    .then(function(response) {
      var data = response.data;
      console.log(data)
    
      res.send({data});
    
    
    })
    .catch(function(error) {
      throw error;
    })
    
    };





let updateVoidInMongo = async (req,res) => {
  try {
    const user = await Order.findByUniqueTransId(req.body.uniqueTransId)
    console.log(user)
    res.status(201).json({ user });
 } catch (err) {
console.log(err)
}
}








exports.issueVoid = function (req,res) {

  console.log('issueVoid')
  console.log(req.body.uniqueTransId)
  //Ensure uniqueTransId is set to the id of the transaction to void
  emergepay.voidTransaction({
    uniqueTransId: req.body.uniqueTransId,
    externalTransactionId: emergepay.getExternalTransactionId(),
  
  })
  .then(function(response) {
    var transactionResponse = response.data;
    console.log(transactionResponse)
    res.send({transactionResponse});


  
  })
  .catch(function(error) {
    throw error;
  });
  
    
    }




exports.addOrder = async (req, res) => {
console.log(req.body)
    try {
        const order = new Order({
          email: req.body.payInfo.fulfillment_info.customer.email,
          payInfo: req.body.payInfo,
          orderInfo: req.body.orderInfo,
          void: false,
          uniqueTransId: req.body.orderInfo.uniqueTransId
        });
        // console.log(order)
        let data = await order.save();
        // res.json({ data });
console.log(order)

        // res.status(200).json({data});
        res.status(200).json({ data });

// intercept OPTIONS method
// if ('OPTIONS' == req.method) {
//   res.send(200);
// } else {
//   next();
// }



      } catch (err) {
        res.status(400).json({ err: err });
      }
};



exports.retrieveOrders = async (req, res) => {
console.log(req.params.email)

  try {
   const user = await Order.findByOrderEmail(req.params.email)

  res.status(201).json({ user });
   } catch (err) {

  }
 };

 exports.allOrders = async (req, res) => {
  
    try {
    const user = await Order.find()
      res.status(201).json({ user });
     } catch (err) {
  
    }
   };


   exports.pollingRequest = function (req, res) {
   
    //  console.log(req.query)
   
   emergepay.retrieveTransaction(req.query.externalTransactionId)
   .then(function(response) {
       var transactionResponse = response.data;
      //  console.log(transactionResponse)
   
   
      //  transactionResponse
       res.send({transactionResponse});
   
   })
   .catch(function(error) {
       throw error;
   });
   
   
   }


   exports.startTransaction = function (req, res) {
   let amount = Number(req.body.charges.preTotal)
   let tipAmount = Number(req.body.charges.tip.amount)
   let formattedTipAmount = tipAmount/100
   
   
   let finalAmount = amount
   let finalCash = finalAmount/100
   let config = {
       transactionType: sdk.TransactionType.CreditSale,
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
           },
           {
             id: "tip_amount",
             value: formattedTipAmount.toString()
           }
       ]
   };
     
       emergepay.startTransaction(config)
       .then(function (transactionToken) {
           res.send({
               transactionToken: transactionToken
           });
       })
       .catch(function (err) {
         console.log('error')
           res.send(err.message);
       });
   }







   exports.voidByTransID = async (req, res) => {

    console.log('void by trans id')
    console.log(req.body.uniqueTransId)
    

      try {

        const filter = {uniqueTransId: req.body.uniqueTransId};
        const update = {void:true};

        let doc = await Order.findOneAndUpdate(filter, update, {
          returnOriginal: false
        });

        res.status(201).json({ doc });
       } catch (err) {
        console.log(error)
      }
     };