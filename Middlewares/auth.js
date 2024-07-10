const jwt = require('jsonwebtoken')
const UserModel = require('../Models/User')

const Authenticated = async (req,res,next) => {
    const token = req?.header("Auth")
    if(!token) return res.send({message : "login first"})
        const decoded = jwt.verify(token,"!@$*%&**%&");
    // console.log(decoded);
    const id = decoded.userId
    let user = await UserModel.findById(id)
    if(!user) return res.send({message:"user not exist"})
        req.user = user;
    next()
}

module.exports = Authenticated