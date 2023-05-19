const {sendEmail,emailClass }= require("./email");
const router = require("express").Router();
const userModel = require("./models/User");
router.get("/confirmaccount/:token",checkToken)
router.post("/resendCode",resendCode);


async function checkToken(req,res,next)
{
  const {token} = req.params;
  try {
    const user = await userModel.findOne({accountConfirmCode:token})
    if(!user) return res.status(404).json({error:"no such user"});
    user.accountConfirm = true;
    user.save({validateBeforeSave:true});
    res.status(300).redirect("/home");
  } catch (e) {
    res.status(500);
    return next("something wrong happened try agian");
  }
}

async function resendCode(req,res ,next)
{
    const email = req.body.email
       try {
                const user = await userModel.findOne({email:email});
                if(!user) throw Error("unknown user"); 
        
                const token = user.confirmAccount()
               let link = `${req.protocol}://${req.get('host')}/confirmaccount/${token}`

                await user.save({validateBeforeSave:false});
                const msg = new emailClass(link);
                
                const options = {
                    to:user.email,
                    subject:"ConfirmAccount",
                    html:msg.confirmAccount(),
                }
                try {
                    await sendEmail(options)
                   
                 } catch (error) {
                    res.status(400).json({message:"something wrong happened"});
                 }
                 
                 res.status(200).json({message:"code resent success"});
        
            } catch (error) {
                next(error)
            }
           
           
}


module.exports = router;