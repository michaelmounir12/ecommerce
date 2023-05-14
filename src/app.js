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
const dashRouter = require("./dash");
const cartRouter = require("./cart");
const signOutRouter = require("./signout");
const helmet = require("helmet");
const path = require("path");
const accountConfirmRouter  =require("./confirmPass");
const webHookRouter = require("./webhook");
const app = express();


function redirect(req,res,next){
    if(!req.app.locals.user) {
        return next()}
    else{res.status(300).redirect("/")} 
   }


app.use(cors())

app.use(helmet())


app.use(cookieParser());

app.use( webHookRouter)


app.use(unRestrictedauth)

  


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
app.use(express.static(path.join(__dirname,"photos")));

app.set('view engine', "hbs");
app.set('views', path.join(__dirname,"hbsFiles"))

app.use(compression());

app.get("/",(req,res)=>
{
    res.status(200).redirect("/home");
})

app.use("/login",loginRouter);
app.use(resetPassword)

app.use("/register",registerRouter)
app.use(accountConfirmRouter)

app.use(productsRouter)


app.use(proRouter);


app.use(auth,profile);
app.use(signOutRouter)

app.use(auth,cartRouter);

app.use(auth,orderRouter);


app.use(auth,addressRout,checkoutRouter)





app.use(auth,roleAuth("admin"),DashRouter)

app.use(auth,roleAuth("admin"),dashRouter)


app.use((error,req,res)=>
{
    res.json({Error:error})
})



module.exports = app;