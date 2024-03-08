const mongoose = require("mongoose")
const {Schema} = mongoose

const tktSchema = new Schema({
    fullname: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type:Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {
        type: String,
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Ticket",tktSchema)