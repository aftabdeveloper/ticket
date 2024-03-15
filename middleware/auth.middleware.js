const jwt = require("jsonwebtoken")

const Authorization = (req,res,next)=>{
    const types = [
        "Forgot"
    ]
    const auth =  req.headers.authorization
    if(!auth) throw res.status(400).send("Bad is request")
    const [type,token] = auth.split(" ")
    if(types.indexOf(type) === -1) throw res.status(404).send("bad request")
    try
    {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        req.body = data
        next()
    }
    catch(err)
    {
        throw res.status(500).json("Bad request")
    }
}

module.exports = Authorization