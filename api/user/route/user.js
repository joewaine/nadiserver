const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const userController = require("../controller/userController");



router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/addproduct", userController.addProduct);
router.get('/:id', userController.getUserProducts);




router.post("/usegiftcard", userController.useGiftCard);
router.post("/lookupgiftcard", userController.lookUpGiftCard);
router.get("/gettestimonials/:email", userController.getTestimonials);

router.post("/submittestimonial", userController.submitTestimonial);
router.get('/email/:email', userController.getUserInfo);
      
module.exports = router;

