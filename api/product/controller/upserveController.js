const Product = require("../model/Product");
const fetch = require("node-fetch");

exports.mamnoonItems = async (req, res) => {
  
try {
  const request = await fetch('https://api.breadcrumb.com/ws/v2/items.json', {
      headers: {
          'X-Breadcrumb-Username': `joe-waine_mamnoon-llc`,
          'X-Breadcrumb-Password': 'sbkh_Qgs4HMB',
          'X-Breadcrumb-API-Key': `6110e294b8984840d2c10472bbed3453`
      }
  })
  if (request.ok) {
    const body = await request.json();
    console.log(body)
    // res.status(201).json({ body });
  }
} catch (err) {
//  res.status(400).json({ err: err });
}
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