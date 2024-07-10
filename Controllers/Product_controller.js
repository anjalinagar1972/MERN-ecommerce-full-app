const product_model = require('../Models/Product')


// get all product || get
const getAllProduct =  async (req,res) => {
    try {
        const find = await product_model.find({}).sort({createdAt:-1})
        res.status(200).send(find);
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong"); 
    }
    
}

// add product || create
// const addProduct = async (req,res) => {
//     const {title,description,price,category,qty,imgSrc} = req.body
//     try {
//         let product = await product_model.create({title,description,price,category,qty,imgSrc})
//         res.status(200).send({ message: "product added successfully" ,product});
//     } catch (error) {
//         console.log(error);
//         res.status(400).send("something went wrong"); 
//     }
// }
// add product || create
const addProduct = async (req, res) => {
    try {
      const create = new product_model({ ...req.body });
      const result = await create.save();
      res.status(200).send({ message: "product added successfully" ,result});
    } catch (error) {
      console.log(error);
      res.status(400).send("something went wrong");
    }
  };

  // edit product || edit
const updateProdut = async (req,res) => {
    const id = req?.params?.id;
    try {
        const update = await product_model.findByIdAndUpdate(id,{$set:{...req.body}},{new:true})
        if(!update) return res.status(200).send({ message : 'invalid id'})
        res.status(200).send({ status : true , message : 'product update', update})
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong"); 
    }
}

// delete product || delete

const delete_Product = async (req,res) => {
    const id = req?.params?.id;
    try {
        const deleted = await product_model.findByIdAndDelete({_id:id});
        if(!deleted) return res.status(200).send({ message : 'invalid id'})
        res.status(200).send({ status: true, message: "product deleted successfully",deleted });
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong"); 
    }
}



// product find by id || single id
const getById =  async (req,res) => {
    try {
        let getData = await product_model.findById(req.params.id)
        if(!getData) return res.status(200).send({ message : 'invalid id'})
        res.status(200).send({ status : true , message : 'specific product' ,getData})
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong"); 
    }
    
}





module.exports = {addProduct,getAllProduct,getById,updateProdut,delete_Product}