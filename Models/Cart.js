const mongoose = require("mongoose");

const cart_Item_Schema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    require: true,
  },
  title: { type: String, require: true },
  price: { type: Number, require: true },
  qty: { type: Number, require: true },
  imgSrc: { type: String, require: true },
});

const Cart_schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  items : [cart_Item_Schema]
});

module.exports = mongoose.model("Cart", Cart_schema);
