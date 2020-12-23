const Product = require("../model/Product");
const fetch = require("node-fetch");
const axios = require('axios');




let addMenuData = async (req,nameString) => {
  console.log('doing this')
  // console.log(typeof req)
  try {
    let product = await Product.findOneAndUpdate(
      { "name": nameString },
      { 
          "$set": {
            "menu": req
          }
      },
      {
        upsert: true 
      }
      );      
      res.status(201).json({ product });
console.log(product)
updateAll()

    } catch (err) {
 
    }
};

// let upserveMongo = async (req,res) => {
  
//   console.log('upserve mongo')
//   try {

//     let doc = await Product.find({ "name": req.body.name });

//     res.status(201).json({ doc });
//   } catch (err) {
//     console.log('fail')
//   }
// }

exports.upserveMongo = async (req,res) => {
  
  console.log(req.params)
  try {

    let doc = await Product.find({ "name": req.params.name });

    res.status(201).json({ doc });
  } catch (err) {
    console.log('fail')
  }
}


exports.mamnoonItemsPullMenu = async (req, res) => {
  console.log('mamnoon pull menu')
  
  try {
    const request = await fetch('https://hq.breadcrumb.com/ws/v1/menus/online_ordering/', {
      headers: {
        'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-llc`,
        'X-Breadcrumb-Password': 'uQM8mseTvnTX',
        'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`  
      }
    })
    if (request.ok) { 
      const body = await request.json();
      // console.log(body)
      res.status(201).json({ body });

      addMenuData(body,'mamnoon')

      // upserveMongo('mamnoon')

    }
  } catch (err) {
   res.status(400).json({ err: err });
  }
}



// pull menu from OLO
// pull menu from OLO
// pull menu from OLO
// pull menu from OLO

exports.mamnoonItemsPullMenuMbar = async (req, res) => {
  console.log('mbar pull menu')

  try {
    const request = await fetch('https://hq.breadcrumb.com/ws/v1/menus/online_ordering/', {
      headers: {
        'X-Breadcrumb-Username': `generic-online-ordering_mbar`,
        'X-Breadcrumb-Password': '2yEULpqH426t',
        'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`  
      }
    })
    if (request.ok) { 
      const body = await request.json();

      res.status(201).json({ body });



      addMenuData(body,'mbar')

      // upserveMongo('mbar')


    }
  } catch (err) {
   res.status(400).json({ err: err });
  }
}


//pull items streeet


exports.mamnoonItemsPullMenuStreet = async (req, res) => {
  console.log('mamnoon street pull menu')
  
  try {
    const request = await fetch('https://hq.breadcrumb.com/ws/v1/menus/online_ordering/', {
      headers: {
        'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-street`,
        'X-Breadcrumb-Password': 'TJzwaP8uguyy',
        'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`  
      }
    })
    if (request.ok) { 
      const body = await request.json();
      // console.log(body)
      res.status(201).json({ body });
  
      addMenuData(body,'mamnoonstreet')

      // upserveMongo('mamnoonstreet')

    }
  } catch (err) {
   res.status(400).json({ err: err });
  }
}
//pull items street
// post an online order
// post an online order
// post an online order
// post an online order
// post an online order

exports.postOnlineOrder = async (req, res) => {
  

  console.log(1)

    console.log(345)
      
      axios.post('https://hq.breadcrumb.com/ws/v1/orders', req,
      {
      headers: {
        'X-Breadcrumb-Username': `generic-online-ordering_mamnoon-llc`,
        'X-Breadcrumb-Password': 'uQM8mseTvnTX',
        'X-Breadcrumb-API-Key': `e2ebc4d1af04b3e5e213085be842acaa`
    
    }})
         .then(function (res) {
            console.log(res)
         })
         .catch(function (error) {
           console.log(error)
         });
    
        
        }
        

        
        exports.streetItems = async (req, res) => {
          
          const secret = "{}"
          try {
            const request = await fetch('{}', {
              headers: {
                '': ``,
                '': ''
              }
            })
            if (request.ok) {
              const body = await request.json();
              res.status(201).json({ body });
            }
          } catch (err) {
            res.status(400).json({ err: err });
          }
                                        
          
          
        }
          
          
        let updateAll = async () => { 
          try{
      console.log('update all')

      await Product.updateMany(
        {}
        , {
        '$set': {
              "menu.items.$[].lbs": 0,
              "menu.items.$[].oz": 0,
              "menu.items.$[].shippable": false
        }
      },{ multi: true });

    }catch (err) {
      console.log(err)
      }
      }
      


        // updateAll()
        
              exports.shippableEdit = async (req, res) => {


                try{
                  console.log('update one')
                  await Product.findOneAndUpdate(
                    {name: "mamnoon", "menu.items": {$elemMatch: {id: req.body.id}}},
                    {
                    $set: {
                          "menu.items.$.shippable": req.body.tf
                    }
                  },{'new': true, 'safe': true, 'upsert': true});
            
                }catch (err) {
                  console.log(err)
                  res.send('success')
                  }

              }





              exports.updateRetailItemLbs = async (req, res) => {


                try{
                  console.log('update one')
                  await Product.findOneAndUpdate(
                    {name: "mamnoon", "menu.items": {$elemMatch: {id: req.body.id}}},
                    {
                    $set: {
                          "menu.items.$.lbs": req.body.number
                    }
                  },{'new': true, 'safe': true, 'upsert': true});
            
                }catch (err) {
                  console.log(err)
                  res.send('success')
                  }

              }


              exports.updateRetailItemOz = async (req, res) => {


                try{
                  console.log('update one')
                  await Product.findOneAndUpdate(
                    {name: "mamnoon", "menu.items": {$elemMatch: {id: req.body.id}}},
                    {
                    $set: {
                          "menu.items.$.oz": req.body.number
                    }
                  },{'new': true, 'safe': true, 'upsert': true});
            
                }catch (err) {
                  console.log(err)
                  res.send('success')
                  }

              }

