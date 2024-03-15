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

const {
    verifyToken 
} = require("./controller/token.controller")

const {
    signUp,
    signIn,
    forgotPassword
} = require("./controller/auth.controller")

const Authorization = require("./middleware/auth.middleware")
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(cors({
    origin: process.env.USER_CLIENT,
    credentials: true, // Allow credentials
}))
server.get("/ticket",fetchTicket)

server.post("/ticket",createTicket)

server.put("/ticket/:id",updateTicket)

server.delete("/ticket/:id",deleteTicket)

 // razorpay
server.post("/razorpay/order",generateOrder)
server.post("/razorpay/webhook",validatePayment)

//verify token
server.post("/auth/verify", Authorization, verifyToken)
//Auth
server.post("/auth/register",signUp)
server.post("/auth/login",signIn)
server.post("/auth/forgot-password",forgotPassword)

server.listen(8080)