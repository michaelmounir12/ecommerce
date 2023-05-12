const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    product: {id:{type:mongoose.Schema.ObjectId,ref:"Product"},quantity:Number,price:Number,title:String,img:String},
    shippingAddress: {
      type: String,
      required: true
    },
    orderId:{type:String,required:true},
    name:String,
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered","canceled"],
      default: "pending"
    },
    
      paymentMethod: {
        type: String,
        required: true,
        default:"card",
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
      },
      paymentDate: {
        type: Date,
        default: null
      }
    ,shippingAddress:Object
  });
  
  const Order = mongoose.model("Order", orderSchema);


  module.exports = Order;