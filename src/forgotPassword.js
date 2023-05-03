const userModel = require("./models/User");
const {sendEmail,emailClass}  = require("./email");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");



const router = express.Router();

router.post("/forgotpassword",forgotPass);

router.post("/resetpassword/:token",resetPass)

router.get("/forgotpassword",httpForgotPassGET)

router.get("/resetpassword/:token",httpResetPassGET)


function httpResetPassGET(req,res)
{
    res.status(200).sendFile(path.join(__dirname,process.env.STATE ==="dev"?"public":"dist","HTML","resetpass.html"));
}


function httpForgotPassGET(req,res)
{
    res.status(200).sendFile(path.join(__dirname,process.env.STATE ==="dev"?"public":"dist","HTML","forgotpass.html"));
}


async function forgotPass(req,res,next)
{
    const {email} = req.body;

    const user = await userModel.findOne({email:email});
    if(!user)
    {
        return res.status(401).json({error:"no such user"});
    }
    const resetToken = user.createResetPass();
    await user.save({validateBeforeSave:false})

    const link = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;
    const msg = new emailClass(link)
    const options = {to:email,subject:"resetPassword",link:link,html:msg.resetPass()};
    try {
       await  sendEmail(options);
    } catch (error) {
        user.resetPassword = undefined;
        user.resetPasswordExpiryDate = undefined;
        await user.save({validateBeforeSave:false});
        return res.status(400).json({error:"something wrong happened while sending email"});
    }

    res.status(200).json({message:`reset password mail sent to ${email}`});
    
    

     

     


}

async function resetPass(req,res,next)
{
    // console.log(req.body.password)
    const token = req.params.token.trim()
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const password = req.body.password;

    
    
    const user =await userModel.findOne({resetPassword:hashedToken,resetPasswordExpiryDate:{$gt:Date.now()}});
  
    if(!user)
    {
        res.status(400)
        return next("invalid token")
    }

    try {
         user.resetPassword = undefined;
    user.resetPasswordExpiryDate = undefined;
    const pass = user.password =await bcrypt.hash(password,10);
    user.passwordConfirm = pass;

    user.passwordModifiedAt = Date.now();
    await user.save();
    } catch (error) {
        res.status(400);
        return next("something wrong happened try later...");
    }
   

   
    const jwtToken = jwt.sign({id:user.id,name:user.name},process.env.TOKEN_SECRET,{expiresIn:"30d"})
    req.user = {id:user._id,name:user.name,role:user.role};
    res.cookie("jwt",jwtToken,{httpOnly:true,secure:process.env.STATE==="dev"?false:true})
    res.status(200).redirect("/HTML/login.html")

   

   





}

module.exports = router;


