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



app.use(express.static(path.join(__dirname,process.env.STATE ==="dev"?"public":"../dist")));
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