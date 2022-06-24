const mongoose=require("mongoose")
const contentSchema=new mongoose.Schema({
    Title:String,
    content:String,
},  {
    timestamps: true,
})
const contentModel=mongoose.model("content",contentSchema)
module.exports=contentModel