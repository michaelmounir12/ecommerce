const express = require("express");

const router  = express.Router();

const {postCheckout,cartCheckout} = require("./checkoutController");


router.post("/checkout",cartCheckout);
// router.post("/",postCheckout);


module.exports = router