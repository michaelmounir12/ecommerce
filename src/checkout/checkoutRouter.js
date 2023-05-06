const express = require("express");

const router  = express.Router();

const {cartCheckout,webHook} = require("./checkoutController");


router.post("/checkout",cartCheckout);


module.exports = router