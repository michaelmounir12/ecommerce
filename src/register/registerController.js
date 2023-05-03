const bcrypt = require("bcrypt");
const Joi = require('joi');
const userModel = require("../models/User");
require("dotenv").config()
const {sendEmail,emailClass }= require("../email")
const path = require("path");




const validschema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),

    password: Joi.string()
        .required().min(4).max(10),

        passwordConfirm: Joi.string()
        .required().min(4).max(10),    

  

  

    email: Joi.string().required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','io','org'] } })
})


async function postUser(req,res,next)
{
    const {name,password,email,confirmPassword} = req.body;
    if(await userModel.findOne({email:email})) return res.status(401).json({error:"user already exist"})
    const {error,value}  = validschema.validate({username:name,password:password,email:email,passwordConfirm:confirmPassword});
    
    if(error)
    {
        res.status(400);
        return  next(error.message);
    } 
   let link;
    try {
        const pass = await bcrypt.hash(password,10)
        const user =  await new userModel({name:name,password:pass,email:email,passwordConfirm:pass,role:"customer"}).save();
        const token = user.confirmAccount();
        user.save({validateBeforeSave:false})
        link = `${req.protocol}://${req.get('host')}/confirmaccount/${token}`
        
      } catch (error) {
        res.status(500).json({error:"something wrong happened try agian..."}) 
      }

      
     

       
       
        const msg = new emailClass(link);
        
        const options = {
            to:email,
            subject:"ConfirmAccount",
            html:msg.confirmAccount(),
        }
        try {
           await sendEmail(options)
          
        } catch (error) {
           res.status(400).json({error:"something wrong happened"});
        }
        
    
  
    res.render("confirmPass.hbs",{email:email})

}

function getController(req,res)
{
    res.status(200).sendFile(path.join(__dirname,"..",process.env.STATE ==="dev"?"public":"dist","HTML","signup.html"))
}


module.exports = {postUser,getController}