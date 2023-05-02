const router = require("express").Router();
const userModel = require("./models/User");

router.get("/address",getAddress);
router.post("/address",postAddress);

async function getAddress(req,res,next)
{
    try {
        const user =await userModel.findById(req.app.locals.user.id);
        res.status(200).render("address.hbs",{city:user.shippingAddress.city||"",street:user.shippingAddress.street||"",houseN:user.shippingAddress.houseNum||""})
    } catch (error) {
        res.status(500);
        return next("something wrong happened try again...")
    }
    

    
}


async function postAddress(req,res,next)
{
    

    const {city,street,housenumber} = req.body;
    if(!city||!street||!housenumber) return res.status(403).json({message:"invalid input"});
    try {
            await userModel.updateOne({_id:req.app.locals.user.id},{shippingAddress:{city:city,street:street,houseNum:housenumber}},{upsert:true});
        
            
      
            
           
    } catch (error) {
        res.status(500)
        return next("something wrong happened try again...");
    }

}








module.exports = router