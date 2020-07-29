const Product = require("../model/Product");
const fetch = require("node-fetch");
const btoa = require('btoa');

exports.addProduct = async (req, res) => {
  
    try {
        const product = new Product({
          name: req.body.name,
          price: req.body.price,
        });
        let data = await product.save();
        res.status(201).json({ data });
      } catch (err) {
        res.status(400).json({ err: err });
      }
};

exports.deleteProduct = async (req, res) => {
  const message = await Product
   .findByIdAndRemove(req.params.id)
   .then(() => 'List deleted');
 
  res.json({ message });
 }


exports.getProducts = async (req, res) => {
  try {
      const products = await Product.find({})
      res.status(201).json({ products });

    } catch (err) {
     res.status(400).json({ err: err });
   }
 };
 
exports.snipCartProducts = async function (req,res) {
console.log(13531353153)
// const secret = "S_OTY0NzY5YjEtYjAxNy00YWNiLTkzMDAtNWMxYjQ3YjQ5YmY0NjM3MjgxMTUxMjMyMDY3ODE2"


const secret = "MTAyNTVhZGQtMzU2Mi00ZWEwLWI1ZjctNWQwY2MwYjZiYjZkNjM3MjYyOTQ3OTQ3OTcxNTA1"
try {
  const request = await fetch('https://app.snipcart.com/api/products', {
      headers: {
          'Authorization': `Basic ${btoa(secret)}`,
          'Accept': 'application/json'
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
