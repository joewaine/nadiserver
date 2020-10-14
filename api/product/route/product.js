const express = require("express");
const router = express.Router();


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept");
    //   next();



    // intercept OPTIONS method
if ('OPTIONS' == req.method) {
    res.send(200);
} else {
    next();
}
  });


const productController = require("../controller/productController");
const upserveController = require("../controller/upserveController")
const axios = require('axios');
const bodyParser = require("body-parser");
router.post("/addproduct", productController.addProduct);
router.get('/allproducts', productController.getProducts);
router.post('/:id', productController.deleteProduct);




// router.get('/upserve', upserveController.mamnoonItems);
router.get('/upserveolo', upserveController.mamnoonItemsPullMenu);
router.get('/upserveolostreet', upserveController.mamnoonItemsPullMenuStreet);

// router.post('/oloorder', productController.postOnlineOrder);
// router.post('/oloorderstreet', productController.postOnlineOrderStreet);


// router.post('/oloorder', async (req, res) => {


//     console.log(124)
//     console.log(req.body)
//     // console.log(123)
//   // console.log(req)
  
//   //    axios.post('https://hq.breadcrumb.com/ws/v1/orders', req.body, {
//   //    headers: {
//   //     'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-llc`,
//   //     'X-Breadcrumb-Password': 'uQM8mseTvnTX',
//   //     'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`,
//   //     'Content-Type': 'application/json'  
//   // }})
//   //       .then(function (res) {
//   //          console.log(res)
//   //       })
//   //       .catch(function (error) {
//   //         console.log(error)
//   //       });
//   })


module.exports = router;




