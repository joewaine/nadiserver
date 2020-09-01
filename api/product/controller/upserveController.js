const Product = require("../model/Product");
const fetch = require("node-fetch");

exports.mamnoonItems = async (req, res) => {
  

  

  
  

try {
  const request = await fetch('https://api.breadcrumb.com/ws/v2/items.json', {
  // const request = await fetch('https://hq.breadcrumb.com/ws/v1/menus/online_ordering/', {
      headers: {
          'X-Breadcrumb-Username': `joe-waine_mamnoon-llc`,
          'X-Breadcrumb-Password': 'sbkh_Qgs4HMB',
          // 'X-Breadcrumb-Username': `odn_mamnoon-llc`,
          // 'X-Breadcrumb-Password': '4JrFTXQk6ZdP',
          'X-Breadcrumb-API-Key': `6110e294b8984840d2c10472bbed3453`
      }
  })
  if (request.ok) {
    const body = await request.json();
    console.log(body)
    res.status(201).json({ body });
  }
} catch (err) {
 res.status(400).json({ err: err });
}
}




// pull menu from OLO
// pull menu from OLO
// pull menu from OLO
// pull menu from OLO


exports.mamnoonItemsPullMenu = async (req, res) => {
  
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
      console.log(body)
      res.status(201).json({ body });
    }
  } catch (err) {
   res.status(400).json({ err: err });
  }
  }


// pull menu from OLO
// pull menu from OLO
// pull menu from OLO
// pull menu from OLO


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