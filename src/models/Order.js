const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    shippingAddress: {
      type: String,
      required: true
    },
    orderTotal: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending"
    },
    payment: {
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
    }
  });
  
  const Order = mongoose.model("Order", orderSchema);


  module.exports = Order;