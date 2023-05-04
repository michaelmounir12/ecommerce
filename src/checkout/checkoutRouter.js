const express = require("express");

const router  = express.Router();

const {cartCheckout,webHook} = require("./checkoutController");


router.post("/checkout",cartCheckout);
// router.post("/",postCheckout);

app.post('/webhook', express.raw({type: 'application/json'}),webHook)

module.exports = router