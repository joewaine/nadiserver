const Product = require("../model/Product");
const fetch = require("node-fetch");
const btoa = require('btoa');
const axios = require('axios');
const cheerio = require('cheerio');

exports.addProduct = async (req, res) => {

console.log(req.body)

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
      // console.log(products)
      res.status(201).json({ products });

    } catch (err) {
     res.status(400).json({ err: err });
   }
 };
 







exports.snipCartProducts = async function (req,res) {

  const secret = "S_OTY0NzY5YjEtYjAxNy00YWNiLTkzMDAtNWMxYjQ3YjQ5YmY0NjM3MjgxMTUxMjMyMDY3ODE2"
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
    // console.log(body)
  }
// console.log('success');

} catch (err) {
 res.status(400).json({ err: err });

 console.log('failure');
}
}
  

exports.tockMeals = async function (req,res) {



console.log('tocky meals')


let url = 'https://www.exploretock.com/mamnoonrestaurant/';
axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html)
    const statsTable = $('.ProfileBody-content ul.Consumer-reservationsList li');
    const tockMeals = [];

    statsTable.each(function () {
      const rank = $(this).find('section').attr('id');
      const description = $(this).find('p').text().trim()
      const href = $(this).find('Consumer-reservationCallToAction')
      const titleName = $(this).find('section h3 a').text();
      console.log(titleName);
      let createdLink = rank.replace('offering-','');
      const title = titleName.replace('Family Meal ','');

      createdLink = url + 'experience/' + createdLink

      let veg = false
      let image = './assets/img/1.jpg'
      if(title.includes('veg') || title.includes('Veg')){
      veg = true
      image = './assets/img/2.jpg'
      }

      tockMeals.push({
        createdLink,
        title,
        veg,
        image,
        description
      });
    });

    // this.$store.commit('updateTockMeals', { tockMeals })

    console.log(tockMeals);

    res.status(201).json({ tockMeals });
  })
  .catch(console.error);




  }



  exports.tockStreetMeals = async function (req,res) {


    let url = 'https://www.exploretock.com/mamnoonstreet/';
    axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const statsTable = $('.ProfileBody-content ul.Consumer-reservationsList li');
        const tockMeals = [];
    
        statsTable.each(function () {
          const rank = $(this).find('section').attr('id');
    
          const description = $(this).find('p').text().trim()

          const href = $(this).find('Consumer-reservationCallToAction')
          const titleName = $(this).find('section h3 a').text();
          let createdLink = rank.replace('offering-','');
          console.log(titleName);
          const title = titleName.replace('Family Meal ','');
          createdLink = url + 'experience/' + createdLink
          let veg = false
          let image = './assets/img/1.jpg'
          if(title.includes('veg') || title.includes('Veg')){
          veg = true
          image = './assets/img/2.jpg'
          }
          tockMeals.push({
            createdLink,
            title,
            veg,
            image,
            description
          });
        });
    
        // this.$store.commit('updateTockMeals', { tockMeals })
    
        console.log(tockMeals);
    
        res.status(201).json({ tockMeals });
      })
      .catch(console.error);
    
    
    
    
      }




