const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SCRET_KEY);

router.post('/v1/webhook', express.raw({type: 'application/json'}),webHook)


async function webHook(req, res){
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.WEBHOOK_SECRET_KEY;
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const Session = event.data.object;
        console.log(Session)
        for(let i of Session.line_items){
                const pro = await productModel.findById(i.metadata.product_id);
                pro.quantity -= i.quantity;
                pro.save({validateBeforeSave:false});
                await new orderModel({customer:req.app.locals.user.id,product:{id:pro.image,quantity:i.quantity,price:i.quantity*i.unit_amount,title:pro.title,img:pro.image},shippingAddress:Session.custom_text,paymentStatus:"paid",paymentDate:Date.now()}).save()
  
        }

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }}
    

module.exports  = router;    