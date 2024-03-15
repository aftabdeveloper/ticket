const User = require("../schema/user.schema")
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const mail = require("../module/mail")
const asTemporary = "600000"
const asPermanent = "604800000"
const getPayload = (user)=>{
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}
const signUp = async (req,res)=>{
    try
    {
        const user = new User(req.body)
        await user.save()
        const accessToken = jwt.sign(getPayload(user),process.env.JWT_SECRET,{expiresIn: asTemporary})
        const refreshToken = jwt.sign(getPayload(user),process.env.JWT_SECRET,{expiresIn: asTemporary})

        res.setHeader('Set-Cookie', cookie.serialize('at', JSON.stringify(accessToken), {
            httpOnly: true,
            maxAge: 900,
            secure: (process.env.PROD === "true" ? true: false)
          }));
        
          res.setHeader('Set-Cookie', cookie.serialize('rt', JSON.stringify(refreshToken), {
            httpOnly: true,
            maxAge: 900, // 1 week
            secure: (process.env.PROD === "true" ? true: false)

          }));
      
        res.status(200).json({success: true})
    }
    catch(err)
    {
        console.log(err.message)
        res.status(500).json({success: false})
    }
}

const signIn = async (req,res)=>{
    try
    {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({success: false})

        const logged = await bcrypt.compare(password,user.password)
        if(!logged) return res.status(401).json({success: false})
        const accessToken = jwt.sign(getPayload(user),process.env.JWT_SECRET,{expiresIn: asTemporary})
        const refreshToken = jwt.sign(getPayload(user),process.env.JWT_SECRET,{expiresIn: asTemporary})

        res.setHeader('Set-Cookie', cookie.serialize('at', JSON.stringify(accessToken), {
            httpOnly: true,
            maxAge: 900,
            secure: (process.env.PROD === "true" ? true: false)
          }));
        
          res.setHeader('Set-Cookie', cookie.serialize('rt', JSON.stringify(refreshToken), {
            httpOnly: true,
            maxAge: 900,
            secure: (process.env.PROD === "true" ? true: false)
          }));

       res.status(200).json({success: true})
    }
    catch(err)
    {
        res.status(200).json({success: false})
    }
}

const forgotPassword = async(req,res)=>{
    try
    {
        const {email} = req.body
        const count = await User.countDocuments({email})
        if(!count) return res.status(404).json({success: false})
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn: 600})
        const link = `${process.env.USER_CLIENT}/forgot-password?token=${token}`
        await mail(email,"Forgot-password",link)
        res.status(200).json({success: true})

    } 
    catch (err)
     {
        console.log(err)
        res.status(500).json({success: false})
    }
}

module.exports = {
    signUp,
    signIn,
    forgotPassword
}
