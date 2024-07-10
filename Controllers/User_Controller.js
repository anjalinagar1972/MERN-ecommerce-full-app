const UserModel = require('../Models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


// user create register
// const register = async (req,res) => {
//   console.log(req.body);
//     try {
//         const create = new UserModel({...req.body})
//         const result = await create.save();
//         res.status(200).send({ message: "user created successfully" ,result});
//     } catch (error) {
//         console.log(error);
//         res.status(400).send("something went wrong");    
//     }
// }

const register = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        let user = await UserModel.findOne({email})
        if(user) return res.status(200).send({ message: "user alredy exist" ,success:false});
        const hassPassword = await bcrypt.hash(password,10)
        user = await UserModel.create({name,email,password:hassPassword})
        res.status(200).send({success:true, message: "user created successfully" ,user});
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong"); 
    }
}

// login
const login = async (req,res) => {
    const {email,password} = req.body
    try {
        let user = await UserModel.findOne({email})
        if(!user) return res.status(200).send({ message: "user not found" ,success:false});
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword) return res.status(200).send({ message: "invalid credential" ,success:false});

        const token = jwt.sign({userId:user._id},"!@$*%&**%&",{expiresIn:'365d'})
        res.status(200).send({success:true, message: `welcome ${user.name}`,token ,user});
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong");  
    }
}

// get all users
const getAllUser = async (req,res) => {
    try {
        let find = await UserModel.find({}).sort({creadtedAt: -1})
        res.status(200).send(find);
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong"); 
    }
}

// get profile || get

const profile = async (req,res) => {
    try {
        res.status(200).send({user:req?.user});
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong");  
    }
    
}

module.exports = {register,login,getAllUser,profile} 