const User = require("../modal/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const { username, password } = req.query || req.body
        if ((await  bcrypt.compare(username, process.env.writer)) && (await bcrypt.compare(password,process.env.password))) {
            const token = jwt.sign({ writer:username }, process.env.secret, { expiresIn: "5h" })
            res.status(200).send(token)
        } else {
            res.status(409).send("false")
        }
    }
    catch (err) {
        // console.log(err,"i am catch err")
        res.status(409).send("login in invalid")
    }

}

module.exports=login