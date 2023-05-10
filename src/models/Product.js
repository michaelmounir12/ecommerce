const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    
    name:String,
    rating:Number,
    comment:String,

})


const productSchema = new mongoose.Schema(
    {
        title:{type:String,required:true},
        desc:{type:String,required:true},
        price:{type:Number,required:true},
        image:String,
        status:{type:Boolean,required:true},
        numofreviews:{type:Number,default:0},
        quantity:{type:Number,required:true},
        rating:{type:Number,default:0},
        reviews:[reviewSchema],
        category:{type:String,required:true},
        
    },
    {timestamps:true}
)


module.exports = mongoose.model("Product",productSchema)