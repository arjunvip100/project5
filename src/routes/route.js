const express = require("express");
const router = express.Router();
const userController=require("../controllers/userController")
const productController=require("../controllers/productController")
const cartController=require("../controllers/cartController")
const orderController=require("../controllers/orderController")
const auth=require("../middleware/auth.js")


// FEATURE I - User 
// User API
router.post("/register",userController.createUser)
router.post("/login",userController.login)
router.get("/user/:userId/profile", auth.userAuth, userController.getUserById);
router.put("/user/:userId/profile",auth.userAuth,userController.UpdateUser)

// FEATURE II - Product 
// Product API
router.post("/products",productController.createProducts)
router.get("/products", productController.getProductByFilter);
router.put("/products/:productId", productController.updateProductById);
router.delete("/products/:productId", productController.deleteProductById);

//----------------if api is invalid OR wrong URL-------------------------
router.all("/**", function (req, res) {
  res
    .status(404)
    .send({ status: false, msg: "Requested API is not available" });
});



module.exports = router;
