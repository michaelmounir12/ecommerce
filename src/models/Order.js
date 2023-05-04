const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [Object],
    shippingAddress: {
      type: String,
      required: true
    },
  
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
    
  });
  
  const Order = mongoose.model("Order", orderSchema);


  module.exports = Order;