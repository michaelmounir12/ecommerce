const router = require("express").Router();
const orderModel = require("./models/Order");
router.get("/dash",dash)

async function dash(req,res,next)
{
    let earning=0,numofsales;
    let customer = [];
    let products = [];

    try {
         const orders  = await orderModel.find({status:"pending"},"customer paymentStatus name product shippingAddress status");
     const count = await orderModel.countDocuments();
     numofsales = count;
     for(let i of orders)
     {
        earning +=i.product.price;
       

        if (!customer.includes( {name:i.name,country:i.shippingAddress.country})) {
            customer.push( {name:i.name,country:i.shippingAddress.country});
          }
   
        products.push({name:i.product.title,price:i.product.price,payStatus:i.paymentStatus, delStatus:i.status})
     }

     return res.status(200).json({earning:earning,numofsales:numofsales,customers:customer,products:products})
    } catch (error) {
        console.log(error)
      res.status(500).json({message:"something wrong happened try later..."})   
    }
    
}


module.exports = router;