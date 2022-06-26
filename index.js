require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const login =require("./utils/login")
const authenticate=require("./utils/auth")
const Content=require("./modal/Content")
const app = express()
const bodyParser=require("body-parser")

// middleware 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get("/",(req,res)=>{
  res.send("welcome to my blogs")
})
app.post("/login",login)

//  route to write blogs
app.post("/blogs/write",authenticate,async(req,res)=>{
   const {title,content}=req.body
//  try{
//     if(title  && content){
//         let article=await Content.create({title,content})
//         res.send(article)
//        }
//  }
//  catch(e){
//         res.send(e)
//     }
res.send( req.body)
 
})
//   getting list of all blogs 

app.get("/blogs",async (req,res)=>{
  try{
let blogs=await Content.find({})
// console.log(blogs);
 res.send(blogs)
  }catch(e){
    res.send(e)
}
})
app.post("/blogs/update",authenticate,async (req,res)=>{
    const {_id,title,content}=req.body
    try{
       if(title&&content){
           let article=await Content.findByIdAndUpdate({_id},{content})
           res.send(article)
          }else{

            res.send(" title and content Required")
          }
    }
    catch(e){
           res.send(e)
       }
  })
const port =process.env.port ||3000
mongoose.connect(process.env.mongo).then(() => {
    app.listen(port, () => {
        console.log("listening at port "+port);
    })
}).catch(
  (e)=>{ 
    console.log(e);
  }
)  