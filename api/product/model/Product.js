const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true]
  },
  description: {
    type: String,
    required: [false]
  },
  price: {
    type: String,
    required: [true, "Please include price"]
  }
});




productSchema.statics.findByProductId = async (id) => {
    let _id = id;
    const product = await Product.findOne({ _id });

    if(!product) {
        throw new Error({ error: "Invalid product id" });
      }
      console.log(product)
      return product

}


const Product = mongoose.model("Product", productSchema);
module.exports = Product;