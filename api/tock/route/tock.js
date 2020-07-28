const express = require("express");
const router = express.Router();
const tockController = require("../controller/tockController");






router.get('/mongotock', tockController.mongoTock);


router.post('/removealltocks', tockController.removeAllTocks);
router.post('/updatetockofferings', tockController.updateTockOfferings);
router.get('/tockmeals/:id', tockController.tockMeals);



module.exports = router;




