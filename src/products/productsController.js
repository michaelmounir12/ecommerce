const Joi = require("joi");
const productModule = require("../models/Product");


const validschema = Joi.object(
    {
        title:Joi.string().min(5).max(30).required(),
        desc:Joi.string().min(5).max(200).required(),
        price:Joi.number().positive().required(),
        category:Joi.string().required(),
        image:Joi.string().required(),
        quantity:Joi.number().positive().required()





    }
)




async function getAllProducts(req,res,next)
{
    let skip = Math.abs(req.body.skip);  
    try {
         const products = await productModule.find({},"numofreviews title rating image price _id").skip(skip).limit(5);
       return res.status(200).json(products);
    } catch (error) {
       res.status(500)
       next("something wrong happened try agian...")   
    }
   
}


function homepage(req,res,next)
{

       
    res.status(200).render("homepage.hbs",{cartLink:req.app.locals.user ? `/cart/${req.app.locals.user.id}`:"/login",ordersLink:req.app.locals.user ? `/orders/${req.app.locals.user.id}`:"/login",profileLink:req.app.locals.user ? `/profile/${req.app.locals.user.id}`:"/login"})

}


async function addProduct(req,res,next)
{
    

    

    let {category,price,description,title,image_url,quantity} = req.body;
    // console.log(price)
    price = Number(price);
    quantity = Number(quantity);
    console.log(quantity)
    const {error} = validschema.validate({quantity:quantity,category:category,price:price,desc:description,title:title,image:image_url})

    if(error)
    {
        res.status(403);
        return next("wrong input"+error.message);

    }

 
    try {
        if(price <=0 ) 
        {throw new Error("invalid input")}
        const product = await new productModule({title:title,desc:description,price:price,image:image_url,quantity:quantity,status:quantity >0,category:category}).save()
       return res.status(201).json(product);
    } catch (error) {
        res.status(400)
        return next(error)
    }



}



module.exports = {addProduct,getAllProducts,homepage}