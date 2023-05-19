const mongoose = require("mongoose");
const crypto = require("crypto");


// const cartSchema = new mongoose.Schema(
   
// )


const userSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        passwordConfirm:{type:String,required:[true,"please confirm password"],validate:{validator:function(el){return el === this.password}}},
        role:{type:String,required:[true,"please provide a role"],enum:["customer"]},
        passwordModifiedAt:Date,
        active:{type:Boolean,default:true},
        resetPassword:String,
        resetPasswordExpiryDate:Date,
        cart:[ {pId:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
        quantity:{type:Number,default:1}
        ,status:Boolean
        ,img:String
        ,price:{type:Number,required:true}
        ,title:String
        ,totalQuantity:Number}],
        shippingAddress:{city:String,street:String,houseNum:Number}   ,
        numOfCartProducts:{type:Number,default:0},
        accountConfirm:{type:Boolean,default:false},
        accountConfirmCode:{type:String,default:undefined}  
    },
    {timestamps:true}
)

userSchema.methods.checkPasswordDate = function(dateOfToken)
{

    if(this.passwordModifiedAt)
    {
        const time = parseInt(this.passwordModifiedAt.getTime()/1000) 
        return dateOfToken < time;
    }
    return false;
}

userSchema.methods.createResetPass = function()
{

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPassword = hashedResetToken;
    this.resetPasswordExpiryDate = Date.now() + 10*60*1000;
   
    return resetToken;

}


userSchema.methods.confirmAccount = function()
{

    const confirmToken = crypto.randomBytes(32).toString("hex");
    this.accountConfirmCode = confirmToken;
       
    return confirmToken;
   
   
    

}

module.exports = mongoose.model("User",userSchema);