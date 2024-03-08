require("dotenv").config()
const paymentController = require("./payment.controller")
const fs = require('fs');

const Razorpay = require('razorpay');
const crypto = require("crypto")

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

const generateOrder = async(req,res)=>{
  try
  {
    const order = await instance.orders.create({
      "amount": (req.body.amount*100),
      "currency": "INR",
      "receipt": `DOT-${Date.now()}`,
      "partial_payment": false
    })

  res.status(200).json(order)
  }
  catch(err)
  {
    res.status(500).json(err)

  }
   
}

const validatePayment = (req,res)=>{
  try
  {
    const signature = req.headers['x-razorpay-signature']
    if(!signature) return res.status(200).send("Unauthorised")
    const data = req.body
    const shasum = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET);
    shasum.update(JSON.stringify(req.body));

    const digest = shasum.digest("hex");
    if(digest !== signature) return res.status(200).send("Unauthorised")
    if(data.event === "payment.captured") return paymentController.createPayment(res,data)
    res.status(200).json("webhook requested")
  }
  catch(err)
  {
    res.status(500).json(err)
  }

}


module.exports = {
  generateOrder,
  validatePayment
}