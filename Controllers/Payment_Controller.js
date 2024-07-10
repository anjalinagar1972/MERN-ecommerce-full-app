const payment_model = require("../Models/Payment");
require('dotenv').config()

{
  /* {rzp_test_nwM4d9FxA8kYpn} "key id"
{0hE0ZdnM3lcRf7EGWljNMUVU} "key Secreat" */
}


// checkout
const Razorpay = require("razorpay");
const razorPay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECREATE_KEY,
});

const checkOut = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;
  try {
    var options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorPay.orders.create(options);
    res.status(200).send({
      orderId: order.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
      status: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

// verify and save to db
const verify = async (req,res) => {
const {orderId,paymentId,signature,amount,orderItems,userId,userShipping} = req.body;
try {
  let orderConfirm = await payment_model.create({orderId,paymentId,signature,amount,orderItems,userId,userShipping,payStatus:"paid"})
  res.status(200).send({message:"payment successfull",success:true,orderConfirm})
} catch (error) {
  console.log(error);
  res.status(400).send("something went wrong");
}
}

// user specific order

const userOrder = async(req,res) =>{
  let userId = req.user._id.toString();
  // console.log(userId);
  try {
    let orders = await payment_model.find({userId:userId}).sort({orderDate :-1})
    res.status(200).send(orders)
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
}

const AllOrders = async(req,res) =>{
  try {
    let orders = await payment_model.find().sort({orderDate :-1})
    res.status(200).send(orders)
    console.log(orders);
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
}



module.exports = { checkOut ,verify,userOrder,AllOrders};
