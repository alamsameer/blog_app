const jwt = require("jsonwebtoken")
// verify token 
function authenticate(req,res,next){
    try{
      const {auth} =req.query
    console.log(auth);
    jwt.verify(auth,process.env.secret ,(err, verifiedJwt) => {
        if(err){
          console.log(err);
          res.send("login Credential Required")
        }else{
          console.log("next");
          next()
        }
    })
    }catch(e){
      console.log(e)
      res.send(e)
    }
    
}
 module.exports=authenticate