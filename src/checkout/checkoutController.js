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
         return {price_data:{currency:'egp',product_data:{name:ele.title,images:[ele.img], metadata: {
          product_id: ele.pId 
        }},unit_amount:ele.price*100},quantity:ele.quantity}
    })
}

else if(req.body.src === "buynow")
{
    if(!req.body.p) return res.status(400).json({message:"invalid product"})
    try {
         const pro = await productModel.findById(req.body.p)
         if(!pro) return res.status(404).json({message:"Not Found"})
         lineItems.push({price_data:{currency:'egp',product_data:{name:pro.title,images:[pro.img], metadata: {
          product_id: pro._id 
        }},unit_amount:pro.price*100},quantity:1})
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
        success_url: 'https://ecommerce-new.onrender.com/home',
        cancel_url: 'https://ecommerce-new.onrender.com/home',
        metadata:lineItems
       
      });
     return res.status(200).json({url:session.url})
} catch (error) {
    res.status(401)
    return next(error.message)
}

}






module.exports = {cartCheckout}
