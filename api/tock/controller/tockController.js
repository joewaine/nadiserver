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

console.log('UPDATE:')
console.log(req.body.updateTockItem)

let updateObject = {
  _id: req.body.updateTockItem._id,
}

if(req.body.updateTockItem.item === 'title'){
  updateObject.title = req.body.updateTockItem.text
}else if(req.body.updateTockItem.item === 'description'){
  updateObject.description = req.body.updateTockItem.text
}else if(req.body.updateTockItem.item === 'image'){
  updateObject.image = req.body.updateTockItem.text
}


console.log('UPDATE to tock')
console.log(updateObject)

try {
  await Tock
  .findOneAndUpdate({_id: req.body.updateTockItem._id},updateObject)
  .then(function(){
    console.log('from offering update')
  })
  res.status(201).json({ status: 201 });
} catch (err) {
  res.status(400).json({ err: err });
}

};


exports.tockFromMongo = async function (req, res){
  try {
    const tocks = await Tock.find({})
    console.log(tocks)
    res.status(200).json({ tocks });
  } catch (err) {
   res.status(400).json({ err: err });
 }
}

exports.tockToMongo = async function (req, res) {

let entry = null
if(req.body.inventoryTockAdd){
 entry = req.body.inventoryTockAdd
}else if(req.body.inventoryTockAddStreet){
 entry = req.body.inventoryTockAddStreet
}


try {

  await Tock
  .insertMany(entry)
  .then(function(){
    // console.log('delete all tocks')
    res.status(200).json({ status: 201 });
  })

} catch (err) {
    res.status(400).json({ err: err });
}



}



// ///
// console.log(tockMeals)

//       try {
//         await Tock
//         .insertMany([
//           {_id: 163298, createdLink: 'fee fee fee'},
//           {_id: 163304, createdLink: 'fee fee fee'},
//           {_id: 143322, createdLink: 'fee fee fee'}
//         ])
//         .then(function(){
//           console.log('delete all tocks')
//         })
//       } catch (err) {
//           res.status(400).json({ err: err });
//       }

// ///

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


