require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SCRET_KEY);
const userModel  = require("../models/User");
const productModel = require("../models/Product")
const orderModel = require("../models/Order");


async function cartCheckout(req,res,next)
{


let lineItems = []

if(req.body.src === "cart")
{
    const user = await userModel.findById(req.app.locals.user.id)
    if(!user.cart) return res.status(404).json({message:"cart is empty"})
    lineItems= user.cart.map((ele)=>
    {
         return {price_data:{currency:'egp',product_data:{name:ele.title,images:[ele.img]},unit_amount:ele.price*100},quantity:ele.quantity}
    })
}

else if(req.body.src === "buynow")
{
    if(!req.body.p) return res.status(400).json({message:"invalid product"})
    try {
         const pro = await productModel.findById(req.body.p)
         if(!pro) return res.status(404).json({message:"Not Found"})
         lineItems.push({price_data:{currency:'egp',product_data:{name:pro.title,images:[pro.img]},unit_amount:pro.price*100},quantity:1})
    } catch (error) {
        re.status(500);
        return next("something wrong happened try again...");
    }
   

}



  try {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items:lineItems ,
        
          shipping_address_collection:{
            allowed_countries: ['EG'],
          },
        
          
          
    
        mode: 'payment',
        success_url: 'https://localhost:5000',
        cancel_url: 'https://localhost:5000',
        custom_text:{shipping_address:{message:`city:${req.body.address.city},street:${req.body.address.street},house:${req.body.address.houseN}`}}
      });
     return res.status(200).json({url:session.url})
} catch (error) {
    res.status(401)
    return next(error.message)
}

}


const endpointSecret = process.env.WEBHOOK_SECRET_KEY;

async function webHook(req, res){
  const sig = req.headers['stripe-signature'];

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
      await new orderModel({customer:req.app.locals.user.id,products:Session.line_items,shippingAddress:Session.custom_text,paymentStatus:"paid",paymentDate:Date.now()}).save()
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }}



module.exports = {postCheckout,cartCheckout,webHook}
