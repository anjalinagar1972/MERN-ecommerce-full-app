const Address_Model = require('../Models/Address')


// create address || post
const addAddress = async (req,res) => {
    let {fullName,address,city,state,country,pincode,phoneNumber} = req.body
    try {     
    let userId = req?.user
    let userAddress = await Address_Model.create({userId,fullName,address,city,state,country,pincode,phoneNumber}) 
    res.status(200).send({status : true , message: "Address added" ,userAddress , success:true});
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong");
    }

}

// get address || get
const getAddress = async (req,res) => {
    try {
    let address = await Address_Model.find({userId:req?.user}).sort({createdAt:-1})
    res.status(200).send({ status : true , message: "Address" ,userAddress:address[0]});
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong"); 
    }
}

module.exports = {addAddress,getAddress}   