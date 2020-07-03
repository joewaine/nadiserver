const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const userController = require("../controller/userController");



router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/addproduct", userController.addProduct);
router.get('/:id', userController.getUserProducts);
      
module.exports = router;

