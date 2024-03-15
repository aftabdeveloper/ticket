const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isMobileVerified: {
        type: Boolean,
        default: false
    },
    token: String
},{timestamps: true})

schema.pre("save", async function(next){
      const count = await mongoose.model("User").countDocuments({ email: this.email });
      if(count) throw next(new Error("Email already exists"))
      next()
    }
)

schema.pre("save",async function(next){
    try
    {
        this.password = await bcrypt.hash(this.password,12)
        next()
    }
    catch(err)
    {
        throw next(new Error("Something wrong"))
    }
})


module.exports = mongoose.model("User",schema)