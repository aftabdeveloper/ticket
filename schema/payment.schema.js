const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan',
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Payment",schema)
