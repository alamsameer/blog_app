require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const login =require("./utils/login")
const authenticate=require("./utils/auth")
const Content=require("./modal/Content")
const app = express()
const bodyParser=require("body-parser")

const cors=require("cors")

// middleware 
app.use(cors())

// body parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.get("/",(req,res)=>{
  res.send("welcome to my blogs")
})
app.post("/login",login)

//  route to write blogs
app.post("/blogs/write",authenticate,async(req,res)=>{
   const {title,content}=req.body
  //  console.log("written",req.body);
 try{
  console.log("try write");
    if(title  && content){
        let article=await Content.create({Title:title,content})
        // console.log("article");
        res.send(article)
       }
       else{
        res.send("title and content are required")
       }
 }
 catch(e){
   console.log(e);
        res.send(e)
    }
 
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
const port =process.env.PORT ||3000
mongoose.connect(process.env.mongo).then(() => {
    app.listen(port, () => {
        console.log("listening at port "+port);
    })
}).catch(
  (e)=>{ 
    console.log(e);
  }
)  