const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    creator_king:String,
    password:String
})

const userModel=mongoose.model("user",UserSchema)

module.exports = userModel