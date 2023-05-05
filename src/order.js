const router = require("express").Router();
const orderModel = require("./models/Order");
router.get("/getorders",getOrders)

async function getOrders(req,res,next)
{
    try {
        const orders =  await orderModel.find({customer:req.app.locals.user.id},"product status");
       return res.status(200).json({orders:orders});
    } catch (error) {
        res.status(500);
        return next("something wrong happened try later...")
    }
 
}


module.exports = router;