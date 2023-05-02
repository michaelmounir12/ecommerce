require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SCRET_KEY);
const userModel  = require("../models/User");
const productModel = require("../models/Product")

async function postCheckout(req,res,next)
{  

    let line_items = []
    let products = req.body;
    for(let i = 0;i<products.length;i++)
    {
        try {

            let pr =  await ProductModel.findById(products[i].ProductId)
    
    if(!pr) return res.status(403).json({error:"invalid input"})
     line_items.push({
         
         price_data: {
           currency: 'egp',
           product_data: {
             name:pr.title ,
             Image,

           },
           unit_amount: pr.price*100,
         },
         quantity: Number(products[i].quantity),
       
 }
 ) 
            
        } catch (error) {
            res.status(400);
            return next("something wrong happened")
        }
    
    }
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:line_items 
              
        ,
            mode: 'payment',
            success_url: 'https://localhost:5000',
            cancel_url: 'https://localhost:5000',
          });
         return res.status(200).json({url:session.url})
    } catch (error) {
        res.status(401)
        return next("something wrong happened...")
    }
    
    

   
}

async function cartCheckout(req,res,next)
{

//   {
         
//     price_data: {
//       currency: 'egp',
//       product_data: {
//         name:pr.title ,
//         Image,

//       },
//       unit_amount: pr.price*100,
//     },
//     quantity: Number(products[i].quantity),
  
// }
console.log(req.body)
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
         lineItems.push({price_data:{currency:'egp',product_data:{name:pro.title,images:[pro.img]},unit_amount:pro.price*1000},quantity:1})
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


module.exports = {postCheckout,cartCheckout}
