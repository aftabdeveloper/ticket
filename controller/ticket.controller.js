require("../module/db")
const Ticket = require("../schema/ticket.schema")

const createTicket = async (req,res)=>{
    try {
        const ticket = new Ticket(req.body)
        await ticket.save()
        res.status(200).json(ticket)
    }
    catch(err)
    {
        res.status(500).json(err)
    }

}

const fetchTicket = async (req,res)=>{
    try
    {
        const tickets = await Ticket.find()
        res.status(200).json(tickets)
    }
    catch(err)
    {
        res.status(500).json(err)
    }   
}

const updateTicket = async (req,res)=>{
    try{
        const id = req.params.id
        const response = await Ticket.updateOne({'_id': id},req.body)
        res.status(200).json(response)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

const deleteTicket = async (req,res)=>{
    try {
        const id = req.params.id
        await Ticket.deleteOne({'_id': id})
        res.status(200).json({message: "success"})
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
module.exports = {
    createTicket,
    fetchTicket,
    updateTicket,
    deleteTicket
}