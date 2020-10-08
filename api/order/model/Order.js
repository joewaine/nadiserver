const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const orderSchema = mongoose.Schema({
  payInfo: {
    type: Object,
    required: [true]
  },
  orderInfo: {
    type: Object,
    required: [true]
  }
});

// orderSchema.statics.findByOrderId = async (id) => {
//     let _id = id;
//     const order = await Order.findOne({ _id });

//     if(!order) {
//         throw new Error({ error: "Invalid order id" });
//       }
//       // console.log(order)
//       return order
// }

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;