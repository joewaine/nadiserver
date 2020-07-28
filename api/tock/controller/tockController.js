const Tock = require("../model/Tock");
const axios = require('axios');
const cheerio = require('cheerio');





exports.mongoTock = async (req, res) => {
  try {
    const tocks = await Tock.find({})
    res.status(201).json({ tocks });
  } catch (err) {
   res.status(400).json({ err: err });
 }
}

exports.logMongoTock = async (req, res) => {
  try {
    const tocks = await Tock.find({})
    console.log(tocks)
  } catch (err) {
   res.status(400).json({ err: err });
 }
}

exports.removeAllTocks = async (req, res) => {
  await Tock
  .deleteMany()
  .then(function(){
    console.log('delete all tocks')
  });
}

exports.updateTockOfferings = async (req, res) => {


console.log(req.body)

try {
  await Tock
  .insertMany(req.body.update)
  .then(function(){
    console.log('delete all tocks')
  })
  res.status(201).json({ status: 201 });
} catch (err) {
  res.status(400).json({ err: err });
}



};

exports.tockMeals = async function (req, res) {
  let url
  if (req.params.id === 'true') {
    url = 'https://www.exploretock.com/mamnoonstreet/';
  } else {
    url = 'https://www.exploretock.com/mamnoonrestaurant/';
  }

  axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const statsTable = $('.ProfileBody-content ul.Consumer-reservationsList > li');
      const tockMeals = [];
      statsTable.each(function () {
        const rank = $(this).find('section').attr('id');
        const description = $(this).find('p').text().trim()
        const href = $(this).find('Consumer-reservationCallToAction')
        const titleName = $(this).find('section h3 a').text();
        let createdLink = null;
        let _id = null;
        if (rank) {
          
          createdLink = rank.replace('offering-', '');
          _id = parseInt(createdLink)
          createdLink = url + 'experience/' + createdLink
        }
        const title = titleName.replace('Family Meal ', '');
        let veg = false
        let image = './assets/img/1.jpg'
        if (title.includes('veg') || title.includes('Veg')) {
          veg = true
          image = './assets/img/2.jpg'
        }
        let delivery = false
        if ($(this).parent().attr('id') === 'delivery-panel') {
          delivery = true
        }
        tockMeals.push({
          createdLink,
          title,
          veg,
          image,
          description,
          delivery,
          _id
        });



        


      });
      res.status(201).json({ tockMeals });








    })
    .catch(console.error);
}



exports.createExistingItems = async (req, res) => {  
  
try {
  await Tock
  .insertMany([
    {_id: 163298, createdLink: 'fee fee fee'},
    {_id: 163304, createdLink: 'fee fee fee'},
    {_id: 143322, createdLink: 'fee fee fee'}
  ])
  .then(function(){
    console.log('delete all tocks')
  })
} catch (err) {
    res.status(400).json({ err: err });
}
  
  
  
  };