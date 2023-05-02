const router = require("express").Router();
const path = require("path");
const {auth} = require("./authorization");
const Joi = require("joi");
const productModel = require("./models/Product");

const reviewschema = Joi.object(
    {
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().min(5).max(200).required(),
       





    }
)


router.get("/product/:proId",getProPage)

router.get("/productCred/:proId",getProCreds)

router.post("/addreview/:proId",auth,addReview)

function getProPage(req,res,next)
{
    res.status(200).render("product.hbs",{id:req.params.proId})
}

async function getProCreds(req,res,next)
{
    try {
        const pro = await productModel.findById(req.params.proId);
        if(!pro) return res.status(404).jaon({message:"Not Found"});
        res.status(200).json({pro:pro});
    } catch (error) {
        res.status(500);
        return next("something wrong happened try again...")
    }
}


async function addReview(req,res,next)
{
    const productId = req.params.proId;
    
    try {
        let {name,rating,text}  = req.body;
        // console.log(name,rating,text)
       const product =  await productModel.findById(productId)
       
       if(!product)
       {
        res.status(404);
        throw new Error("no such product found");
       }
       
       const {error} = reviewschema.validate({comment:text,rating:rating})
       if(error)
       {res.status(403)
        throw new Error("invalid input")}
        
        rating = Number(rating);
      
        let newRating = (product.rating+rating)/(product.numofreviews+1)
        await productModel.updateOne({_id:productId},{$push:{reviews:{name:name,comment:text,rating:rating}},$inc:{numofreviews:1},rating:Math.round(newRating) },{upsert:true})
        res.status(200).redirect(`/product/${productId}`)
    } catch (error) {
       return next(error) 
    }

}



module.exports = router