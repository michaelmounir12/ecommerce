const router = require("express").Router();
const path = require("path");
const userModel = require("./models/User");
const bcrypt = require("bcrypt");
require("dotenv").config()
const jwt = require("jsonwebtoken");
router.get("/profile/:user",getProfilePage)

router.post("/resetpass/:user",resetPass)

function getProfilePage(req,res,next)
{
    res.sendFile(path.join(__dirname,process.env.STATE ==="dev"?"public":"..","dist","profile.html"));
}

async function resetPass(req,res,next)
{
    // console.log("param",req.params)
    try {
        const pass = await bcrypt.hash(req.body.password,10)
      const user =   await userModel.findOneAndUpdate({_id:req.params.user},{password:pass,passwordConfirm:pass, passwordModifiedAt:Date.now()});
        res.clearCookie('jwt');
        const token = jwt.sign({id:user._id,name:user.name},process.env.TOKEN_SECRET,{expiresIn:"30d"})
     res.cookie("jwt",token,{httpOnly:true,secure:process.env.STATE==="dev"?false:true}  )
     req.app.locals.user = {id:user._id,name:user.name,role:user.role};
        res.status(200).redirect("/home");
    } catch (error) {
        res.status(500);
        return next("somthing wrong happened try again..."+error);
    }
}


module.exports = router;