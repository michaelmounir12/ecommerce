const router = require("express").Router();
const productModel = require("./models/Product");
const userModel = require("./models/User");

router.post("/cart",postCart)

router.get("/cartproducts",getProductsCart);
router.put("/cart",updateCart)
router.get("/cart/:user",getCartPage)


function getCartPage(req,res)
{
    
    res.status(200).render("cart.hbs");
}


async function updateCart(req,res,next)
{
  const {qt,dele,proID}  = req.body;
  if(!proID) return res.status(400).json({message:"no product provided"});
  if(qt)
  {
    try {
   await userModel.updateOne(
      { _id: req.app.locals.user.id },
      { $set: { "cart.$[elem].quantity": Number(qt) } },
      { arrayFilters: [ { "elem.pId": proID } ] })
     return res.status(200).json({message:"cart updated"})
  } catch (error) {
    res.status(500)
    return next("something wrong happened try again...");
  }
  }
  else if(dele)
  {
   await userModel.updateOne(
      { _id: req.app.locals.user.id },
      { $pull: { cart: { pId: proID } } })
      return res.status(200).json({message:"cart updated"})
  }
  else return res.status(400).json({message:"cart wasnt updated"})
}


async function postCart(req,res,next)
{

   //check if productid present and it exist
   const pID = req.body.pId;
   
   const product = await productModel.findById(pID)
   if(!pID || !product) return res.status(403).json({message:"no such product"})
   //add product to that user cart
   try {
   await  userModel.updateOne({_id:req.app.locals.user.id},{$addToSet:{cart:{pId:pID, status:product.status,price:product.price,img:product.image,title:product.title,totalQuantity:product.quantity}}})
   } catch (error) {
     res.status(500);
     next("something wrong happened...");
   }
   
   res.status(200).json({message :`product ${product.title} added to cart`})  
}

async function getProductsCart(req,res,next)
{
  let totalprice = 0; 
  try {
     const user = await userModel.findById(req.app.locals.user.id);
     if(!user.cart) return res.status(404).json({message:"Cart is Empty at the moment"})
     user.cart.forEach((ele)=>
     {
         totalprice  = totalprice + (Number(ele.price) * Number(ele.quantity));
     })
      
     
     res.status(200).json({products:user.cart,totalPrice:totalprice});
  } catch (error) {
    res.status(501)
    return next("something wrong happened try again");
  }

 
  
}



module.exports = router;