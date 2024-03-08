const express = require("express")
const server = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const {
     createTicket,
     fetchTicket,
     updateTicket,
     deleteTicket
    } = require("./controller/ticket.controller")

const {
    generateOrder,
    validatePayment
} = require("./controller/razorpay.controller") 

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cors())
server.get("/ticket",fetchTicket)

server.post("/ticket",createTicket)

server.put("/ticket/:id",updateTicket)

server.delete("/ticket/:id",deleteTicket)

server.post("/razorpay/order",generateOrder)
server.post("/razorpay/webhook",validatePayment)

server.listen(8080)