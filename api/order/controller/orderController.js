const Order = require("../model/Order");
const fetch = require("node-fetch");
const btoa = require('btoa');
const axios = require('axios');
const e = require("express");


var sdk = require("emergepay-sdk");



//sandbox

var oid = "1517492274";
var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOjMwNywib2lkIjoxNTE3NDkyMjc0LCJ0b2tlbl91c2UiOiJvcnQiLCJybmQiOjEyOTgyMzk1ODYuMDY0MjgyNCwiZ3JvdXBzIjpbIk9yZ0FQSVVzZXJzIl0sImlhdCI6MTU5OTI1ODg3MH0.zaMi_DDPspTKW6fl2utCGKXwdQT-Q39DKrFOhXxCHA4";
var environmentUrl = "https://api.emergepay-sandbox.chargeitpro.com/virtualterminal/v1";



// production
// var oid = "1535166774";
// var authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWQiOjExMDQsIm9pZCI6MTUzNTE2Njc3NCwidG9rZW5fdXNlIjoib3J0Iiwicm5kIjoxMzcxODQ2NDQ5LjI1MzIzNzUsImdyb3VwcyI6WyJPcmdBUElVc2VycyJdLCJpYXQiOjE2MDU3OTc1NjB9.EeodYvyKoGC_Mp06KdMV8VcuoLQib5ehyPO9Rg5ylNo";
// var environmentUrl = "https://api.emergepay.chargeitpro.com/virtualterminal/v1";

var emergepay = new sdk.emergepaySdk({ oid: oid, authToken: authToken, environmentUrl: environmentUrl });

  
  exports.tokenizedReturn = function (req, res) {


  


    // Ensure that you supply a valid uniqueTransId before trying to run the tokenized payment.
    emergepay.tokenizedRefundTransaction({
      uniqueTransId: req.body.uniqueTransId,
      externalTransactionId: emergepay.getExternalTransactionId(),
      amount: req.body.amount
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
// console.log(req.body)

    try {

      let uniqueTrans = 'giftcard'

      if(req.body.orderInfo.uniqueTransId){
        uniqueTrans = req.body.orderInfo.uniqueTransId
      }

      let externalTrans = 'giftcard'

      if(req.body.orderInfo.externalTransId){
        externalTrans = req.body.orderInfo.externalTransactionId
      }
      




        const order = new Order({
          email: req.body.orderInfo.fulfillment_info.customer.email,
          payInfo: req.body.payInfo,
          orderInfo: req.body.orderInfo,
          void: false,
          uniqueTransId: uniqueTrans,
          upserveId: req.body.orderInfo.id,
          status: 'Open',
          orderPosted: false,
          orderAccepted: false,
          shippingOrder: req.body.orderInfo.fulfillment_info.type === 'delivery' ? true : false,
          shipped: false,
          shippingInfo: {order:'empty'}
        })



        
        let data = await order.save();
        // res.json({ data });
        // console.log(order)
        // res.status(200).json({data});
        res.status(200).json({ data });
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

    console.log(req.body)
    console.log(Number(req.body.charges.shipping) * 100)
    let shipping
    if(req.body.charges.shipping){
      shipping = Number(req.body.charges.shipping) * 100
    }else{
      shipping = 0
    }

   let amount = Number(req.body.charges.total) - Number(req.body.charges.tip.amount) + shipping
   let tipAmount = Number(req.body.charges.tip.amount)

let toFixed = tipAmount/100

   let formattedTipAmount = toFixed.toFixed(2)
   
  
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
console.log(config)


       emergepay.startTransaction(config)
       .then(function (transactionToken) {
         console.log(transactionToken)
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

    // console.log('void by trans id')
    // console.log(req.body.uniqueTransId)
    

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




     exports.lookUpGiftCard = async (req, res) => {
      console.log('look up giftcard')
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      today = mm + '/' + dd + '/' + yyyy;
    
      let currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
      let currentTimeSliced = currentTime.replace(' ', '')
    
      var xmlBodyStr = `request=<?xml version="1.0"?>
      <Trans>
      <Header>
          <FmtType>ClientWeb</FmtType>
          <FmtVer>1.0.0</FmtVer>
          <Uid>A7FEDD8B-BF2C-4D63-917D-4C1130ABFE4E</Uid>
          <Client>1047</Client>
          <ClientCode>B5C7A5CD-CAFB-4BE7-90F5-1A5ACB29292A</ClientCode>
          <Location>99992</Location>
          <Server>123</Server>
          <TransDate>${today}</TransDate>
          <TransTime>${currentTimeSliced}</TransTime>
          <POSSerial>12345</POSSerial>
      </Header>
      <Requests>
      <SvInquiry>
      <CardNbr>
      ${req.body.cardNumber}
      </CardNbr>
      </SvInquiry>
      </Requests>
      </Trans>`;
    
      var config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
      axios.post('https://portal2.custcon.com/Partner/ProcessXml', xmlBodyStr, config).then(response => {
    
        let resData = response.data
        // // console.log(resData)
        let resSendData = null
    
        parseString(resData, function (err, result) {
          resSendData = result['Trans'];
        });
        res.send(201).json({ resSendData });
      }).catch(err => {
        // // console.log(err)
        res.status(400).json({ err: err });
      });
    
    };
    



    exports.useGiftCard = async (req, res) => {
      console.log('use giftcard')
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      today = mm + '/' + dd + '/' + yyyy;
    
      let currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
      let currentTimeSliced = currentTime.replace(' ', '')
      var xmlBodyStr = `request=<?xml version="1.0"?>
        <Trans>
        <Header>
        <FmtType>ClientWeb</FmtType>
        <FmtVer>1.0.0</FmtVer>
        <Uid>A7FEDD8B-BF2C-4D63-917D-4C1130ABFE4E</Uid>
        <Client>1047</Client>
        <ClientCode>B5C7A5CD-CAFB-4BE7-90F5-1A5ACB29292A</ClientCode>
        <Location>99992</Location>
        <Server>123</Server>
        <TransDate>${today}</TransDate>
        <TransTime>${currentTimeSliced}</TransTime>
        <POSSerial>12345</POSSerial>
        </Header>
        <Requests>
        <SvUse>
        <CardNbr>
        ${req.body.cardNumber}
        </CardNbr>
        <Amount>${req.body.useAmount}</Amount>
        </SvUse>
        </Requests>
        </Trans>`;
    
      var config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };
      //  axios.post('http://test.portal.custcon.com/Partner/ProcessXml', xmlBodyStr, config).then(response => {
    

      console.log(req.body)
      axios.post('https://portal2.custcon.com/Partner/ProcessXml', xmlBodyStr, config).then(response => {
        let resData = response.data
        let resSendData = null
// console.log(resData)
        parseString(resData, function (err, result) {
          resSendData = result['Trans'];
        });
    
        res.send(201).json({ resSendData });
    
      }).catch(err => {
    
        res.status(400).json({ err: err });
      });
    
    };



    

  



    exports.updateRefundItems = async (req, res) => {
      
      console.log(req.body.cartId)
      try {
        // let doc = await Order.findById('5f97465eebb3b9108bc2a50b')

      let doc = await Order.findOneAndUpdate(
    { "_id": req.body.orderId, "orderInfo.charges.items.cartId": req.body.cartId },
    { 
        "$set": {
          "orderInfo.charges.items.$.returned": true
        }
    },
    function(err,doc) {
  
    }
  );


  console.log('you just got one')
  res.status(201).json({ doc });
} catch (err) {
console.log(err)
}
};




exports.markAsShipped = async (req, res) => {

  // console.log('void by trans id')
  console.log(req.body.uniqueTransId)
  
console.log('set to shipped')
    try {

      const filter = {_id: req.body.uniqueTransId};
      const update = {shipped:true};

      let doc = await Order.findOneAndUpdate(filter, update, {
        returnOriginal: false
      });

      res.status(201).json({ doc });
     } catch (err) {
      console.log(error)
    }
   };