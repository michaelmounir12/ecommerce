const Jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel= require("./models/User");

async function unRestrictedauth(req,res,next)
{

  //1-verify token && user is active
  
  if(!req.cookies.jwt)
  {
    return next();

  }
  const decode = await Jwt.verify(req.cookies.jwt,process.env.TOKEN_SECRET);
  if(!decode)
  {
    return next();

  }
  const user = await userModel.findById(decode.id);
  if(!user.active)
  {
    return next();

  }
  if(!user.accountConfirm)
  {
    return next();

  }
  //2-check if password modified after token was issued
  
  if(user.checkPasswordDate(decode.iat))
  {
    return next();
  }
  req.app.locals.user = {id:user._id,name:user.name,role:user.role}
  next()
   
}




async function auth(req,res,next)
{

  //1-verify token && user is active
  if(!req.cookies.jwt)
  {
    return res.status(401).redirect("/login");

  }
  const decode = await Jwt.verify(req.cookies.jwt,process.env.TOKEN_SECRET);
  if(!decode)
  {
    return res.status(401).json({error:"unauthorized"});

  }
  const user = await userModel.findById(decode.id);
  if(!user.active)
  {
    return res.status(401).json({message:"account is unactive"});

  }
  if(!user.accountConfirm)
  {
    return res.status(401).json({message:"please Confirm Password"});

  }
  //2-check if password modified after token was issued
  
  if(user.checkPasswordDate(decode.iat))
  {
    return res.status(401).json({error:"unauthorized"});
  }
  req.app.locals.user = {id:user._id,name:user.name,role:user.role}
  next()
   
}



function roleAuth(...roles)
{
  return async(req,res,next)=>
  {
    const user =  await userModel.findById(req.app.locals.user.id)
    
      if(!roles.includes(user.role))
      {
        return res.status(401).json({error:"unauthorized"});

      }
      next()
  }
}



module.exports = {auth,roleAuth,unRestrictedauth};


