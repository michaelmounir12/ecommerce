const express = require("express");
const registerRouter = require("./register/registerRouter");
const cookieParser = require("cookie-parser");
const loginRouter = require("./login/loginRouter");
const productsRouter = require("./products/productsRouter");
const hbs = require("hbs")
const resetPassword = require("./forgotPassword");
const addressRout = require("./address"); 
const checkoutRouter = require("./checkout/checkoutRouter");
const {auth,unRestrictedauth, roleAuth}  = require("./authorization");
const proRouter = require("./product");
const compression = require("compression");
const profile = require("./profile");
const DashRouter = require("./dashboard");
const orderRouter = require("./order");
require("dotenv").config();
const cors = require("cors")
const cartRouter = require("./cart");
const signOutRouter = require("./signout");
const helmet = require("helmet");
const path = require("path");
const accountConfirmRouter  =require("./confirmPass");
const stripe = require("stripe")(process.env.STRIPE_SCRET_KEY);

const app = express();


function redirect(req,res,next){
    if(req.app.locals.user) {
        return res.status(300).redirect("/home")}
    else return next()
   }


app.use(cors())

app.use(helmet())


app.use(cookieParser());

app.use(express.json({limit:"10kb"}));
app.use(express.urlencoded({extended:true,limit:"10kb"}));

if(process.env.STATE === "dev")
{
    app.use(express.static(path.join(__dirname,"public")));

}else
{
    app.use(express.static(path.join(__dirname,"..","dist")));

}

app.use(express.static(path.join(__dirname,"hbsFiles")));

app.set('view engine', "hbs");
app.set('views', path.join(__dirname,"hbsFiles"))

app.use(compression());
app.use(unRestrictedauth)

app.get("/",(req,res)=>
{
    res.status(200).redirect("/home");
})

app.use("/login",redirect,loginRouter);
app.use(resetPassword)

app.use("/register",redirect,registerRouter)
app.use(accountConfirmRouter)
app.use(proRouter);

app.use(productsRouter)


app.post('/webhook', express.raw({type: 'application/json'}),async function webHook(req, res){
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.WEBHOOK_SECRET_KEY;
    console.log("webooook")
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
        for(let i of Session.line_items){
                const pro = await productModel.findById(i.metadata.product_id);
                pro.quantity -= i.quantity;
                pro.save({validateBeforeSave:false});
                await new orderModel({customer:req.app.locals.user.id,product:{id:pro.image,quantity:i.quantity,price:i.quantity*i.unit_amount,title:pro.title,img:pro.image},shippingAddress:Session.custom_text,paymentStatus:"paid",paymentDate:Date.now()}).save()
  
        }

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }}
    
  )

app.use(auth,profile);
app.use(signOutRouter)

app.use(auth,cartRouter);

app.use(auth,orderRouter);


app.use(auth,addressRout,checkoutRouter)





app.use(auth,roleAuth("admin"),DashRouter)




app.use((error,req,res)=>
{
    res.json({Error:error})
})



module.exports = app;