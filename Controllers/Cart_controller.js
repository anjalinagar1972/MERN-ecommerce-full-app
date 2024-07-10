const Cart_model = require('../Models/Cart')


// add to cart || post
const addToCart = async (req,res) => {
    const {productId,title,price,qty,imgSrc} = req.body
    try {
        const userId = req?.user

        let cart = await Cart_model.findOne({userId})

        if(!cart){
            cart = new Cart_model({userId,items:[]})
        }

        const itemIndex = cart.items.findIndex((item) => item?.productId?.toString() === productId)
        if(itemIndex > -1){
            cart.items[itemIndex].qty += qty
            cart.items[itemIndex].price += price*qty
        }else{
            cart.items.push({productId,title,price,qty,imgSrc})
        }
        await cart.save()
        res.status(200).send({ status : true , message : 'item added to cart' , cart})
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong");
    }
}

// get user cart || get
const userCart = async (req,res) => {
    try {
        const userId = req?.user
        let cart = await Cart_model.findOne({userId})
        if(!cart) return res.status(200).send({ message : 'cart not found' })
        res.status(200).send({ status : true , message : 'user cart' , cart})
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong"); 
    }
}


// remove product from cart || delete
const removeProductFromCart = async (req,res) => {
    // const productId = '6675a9d139c69f9af8c34f0d'
    const productId = req?.params?.productId

    console.log(productId);
    try {
        const userId = req?.user
        let cart = await Cart_model.findOne({userId});
        if(!cart) return res.status(200).send({ message : 'cart not found' })
            cart.items = cart.items.filter((item)=>item.productId.toString() !== productId)
        await cart.save();
        res.status(200).send({ status : true , message : 'product removed successfully' , cart})
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong"); 
    }
}

// clear cart || delete
const clearCart = async (req,res) => {
    try {
        const userId = req?.user
        let cart = await Cart_model.findOne({userId});
        if(!cart){
            cart = new Cart_model({items:[]})
        } else{
            cart.items = [];
        }
        await cart.save();
        res.status(200).send({ status : true , message : 'cart cleared' , cart})
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong"); 
    }
}

// decrease qty || post
const decreaseQty = async (req,res) => {
    const {productId,qty} = req.body
    try {
        const userId = req?.user

        let cart = await Cart_model.findOne({userId})

        if(!cart){
            cart = new Cart_model({userId,items:[]})
        }

        const itemIndex = cart.items.findIndex((item) => item?.productId?.toString() === productId)
        if(itemIndex > -1){
            const item = cart.items[itemIndex]
            if(item.qty > qty){
                const pricePerUnit = item.price/item.qty
                item.qty -= qty
                item.price -= pricePerUnit*qty
            }else{
                cart.items.splice(itemIndex,1)
            }

        }else{
            return res.send({ message : 'invalid product' })
        }
        await cart.save()
        res.status(200).send({ status : true , message : 'item quantity decrease' , cart})
    } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong");
    }
}









module.exports = {addToCart,userCart,removeProductFromCart,clearCart,decreaseQty}