const router = require("express").Router();
const orderModel = require("./models/Order");
router.get("/getorders",getOrders);
router.get("/orders/:id",GETOrderPage);
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

function GETOrderPage(req,res,next)
{
   res.status(200).render("order.hbs")
 
}

module.exports = router;