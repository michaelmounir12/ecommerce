const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
require("dotenv").config()
const path = require("path");
const bcrypt = require("bcrypt");
const Joi = require('joi');


const validschema = Joi.object({

    password: Joi.string()
        .required().min(4).max(10),

  

   
    email: Joi.string().required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','io','org'] } })
})



function getController(req,res,next)
{
   res.status(200).sendFile(path.join(__dirname,"..",process.env.STATE ==="dev"?"public/login.html":"../dist/login.html"));
}



async function postController(req,res,next)
{
     const {email,password} = req.body;
     
     const {error} = validschema.validate({email:email,password:password});


     if(error)
     {
        res.status(403);
        return next(error.message);
     }


     const user = await userModel.findOne({email:email});
     if(!user)
     {
        res.status(401);
        return next("no such user");
     }


     if(!await bcrypt.compare(password,user.password) )
     {
        res.status(401);
        return next("invalid password");
     }


     if(!user.accountConfirm ) return res.status(401).json({message:"please confirm your account"})
     const token = jwt.sign({id:user._id,name:user.name},process.env.TOKEN_SECRET,{expiresIn:"30d"})
     res.cookie("jwt",token,{httpOnly:true,secure:process.env.STATE==="dev"?false:true}  )
     req.app.locals.user = {id:user._id,name:user.name,role:user.role};
     res.status(200).redirect("/home")
     


}

module.exports = {postController,getController}
