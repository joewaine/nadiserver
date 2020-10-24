const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const orderSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true]
  },
  payInfo: {
    type: Object,
    required: [true]
  },
  orderInfo: {
    type: Object,
    required: [true]
  },
  void: {
    type: Boolean,
    required: [true]
  },
  uniqueTransId: {
    type: String,
    required: [true]
  },
  externalTransId: {
    type: String,
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







//this method search for a order by email
orderSchema.statics.findByOrderEmail = async (email) => {
  const order = await Order.find({ email });
  console.log(order)
  if (!order) {
    throw new Error({ error: "Invalid login details" });
  }

  return order;
};









const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
