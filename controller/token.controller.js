const jwt = require("jsonwebtoken")

const verifyToken = (req,res)=>{
    try
    {
       const {email} = req.body
       const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn: 600})
       res.setHeader("Authorization", `Forgot ${token}`)
       res.status(200).json({success: true})
    }
    catch(err)
    {
        console.log("request completed")
    }
}

module.exports = {
    verifyToken
}