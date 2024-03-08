const Payment = require("../schema/payment.schema")

const createPayment = async (res,data)=>{
    try
    {
      const payload = data.payload.payment.entity
      const payment = new Payment({
        paymentId:payload.id,
        amount:payload.amount,
        currency:payload.currency,
        status:payload.status,
        email:payload.email,
        mobile:payload.contact,
        plan:payload.notes.plan,
        fee:payload.fee,
        tax:payload.tax,
        createdAt:payload.created_at,
        updatedAt:payload.created_at
      })
      
    await payment.save()
    res.status(200).json({success: true})
    }
    catch(err)
    {
      res.status(500).json({success: false})
    }
  
}

module.exports = {
    createPayment
}