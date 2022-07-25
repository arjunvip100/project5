const express = require("express");
const router = express.Router();
const userController=require("../controllers/userController")
const productController=require("../controllers/productController")
const cartController=require("../controllers/cartController")
const orderController=require("../controllers/orderController")
const auth=require("../middleware/auth.js")



router.post("/register",userController.createUser)
router.post("/login",userController.login)
router.get("/user/:userId/profile", auth.userAuth, userController.getUserById);




//----------------if api is invalid OR wrong URL-------------------------
router.all("/**", function (req, res) {
  res
    .status(404)
    .send({ status: false, msg: "Requested API is not available" });
});



module.exports = router;
