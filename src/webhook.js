const express = require("express");
const router = express.Router();
require("dotenv").config();
const productModel = require("./models/Product");
const stripe = require("stripe")(process.env.STRIPE_SCRET_KEY);
const orderModel = require("./models/Order");


router.post('/v1/webhook', express.raw({type: 'application/json'}),webHook)


async function webHook(req, res){
    const sig = req.headers['stripe-signature'];
    const endpointSecret = "whsec_7k2weaGpGD1Rtrv9VzrUF2g5LANloq9a";
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    const sessionId = event.data.object.id;

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ['line_items']
        });
        const lineItems = session.line_items;

        // Use the line items data as needed
        console.log(lineItems.data);
        for(let i of session.line_items.data){
          let j = 0

                const pro = await productModel.findById(i.description);
                pro.quantity -= i.quantity;
                pro.save({validateBeforeSave:false});
                await new orderModel({customer:req.app.locals.user.id,product:{id:i.description,quantity:i.quantity,price:i.quantity*i.unit_amount,title:pro.title,img:pro.image},shippingAddress:session.shipping_details.address,paymentStatus:"paid",paymentDate:Date.now()}).save()
  
        }

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }}
    

module.exports  = router;    