const Product = require("../model/Product");
const fetch = require("node-fetch");
const btoa = require('btoa');
const axios = require('axios');
const cheerio = require('cheerio');

exports.addProduct = async (req, res) => {

// console.log(req.body)

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



console.log('tock meals mamnoon restaurant')


let url = 'https://www.exploretock.com/mamnoonrestaurant/';
axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html)
    const statsTable = $('.ProfileBody-content ul.Consumer-reservationsList > li');
    const tockMeals = [];

console.log(statsTable.length)

    statsTable.each(function () {
      const rank = $(this).find('section').attr('id');
      console.log('rank: ' + rank)
      const description = $(this).find('p').text().trim()
      console.log('description: ' + description)
      const href = $(this).find('Consumer-reservationCallToAction')
      console.log('href: ' + href);
      const titleName = $(this).find('section h3 a').text();
      console.log('titleName: ' + titleName);
      let createdLink = null;

      if(rank){

      createdLink = rank.replace('offering-','');
      createdLink = url + 'experience/' + createdLink

    }

      const title = titleName.replace('Family Meal ','');

    
      let veg = false
      let image = './assets/img/1.jpg'

      if(title.includes('veg') || title.includes('Veg')){
      veg = true
      image = './assets/img/2.jpg'
      }



      // console.log($(this).parent().attr('id'));

      let delivery = false

      if($(this).parent().attr('id') === 'delivery-panel'){
        delivery = true
      }


      tockMeals.push({
        createdLink,
        title,
        veg,
        image,
        description,
        delivery
      });
    });

    // this.$store.commit('updateTockMeals', { tockMeals })

    // console.log(tockMeals);

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
        const statsTable = $('.ProfileBody-content ul.Consumer-reservationsList > li');
        
        const tockMeals = [];

        statsTable.each(function () {
          const rank = $(this).find('section').attr('id');
          console.log('rank: ' + rank)
          const description = $(this).find('p').text().trim()
          console.log('description: ' + description)
          const href = $(this).find('Consumer-reservationCallToAction')
          console.log('href: ' + href)
          const titleName = $(this).find('section h3 a').text();
    
          console.log('title: ' + titleName);




// ###
let createdLink = null;

if(rank){

createdLink = rank.replace('offering-','');
createdLink = url + 'experience/' + createdLink

}

// ###


          
          const title = titleName.replace('Family Meal ','');

        
          let veg = false
          let image = './assets/img/1.jpg'
    
          if(title.includes('veg') || title.includes('Veg')){
          veg = true
          image = './assets/img/2.jpg'
          }

















          // console.log($(this).parent().attr('id'));


          let delivery = false

          if($(this).parent().attr('id') === 'delivery-panel'){
            delivery = true
          }

          tockMeals.push({
            createdLink,
            title,
            veg,
            image,
            description,
            delivery
          });


          
        });
    
        // this.$store.commit('updateTockMeals', { tockMeals })
    
        // console.log(tockMeals);
    
        res.status(201).json({ tockMeals });
      })
      .catch(console.error);
    
    
    
    
      }




