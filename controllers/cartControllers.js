const Cart = require('../models/Cart')


const addCartProduct = async(req,res)=> {
        try {
            const productId = req.params.productId;
            const userId = req.user._id; // Assuming you've stored the logged-in user's ID in the session
            const product_name = req.body.product_name

            if (!userId) {
                return res.status(401).send('Unauthorized');
            }

            const cart = await Cart.findOne({ user_id: userId });

            if (!cart) {
                const newCart = await Cart.create({ user_id : userId, items: [] });
                newCart.cartItems.push({ product_id: productId , name: product_name});
                await newCart.save();
            } 
            else {
                const cartItem = cart.cartItems.find(item => item.product_id.toString() === productId);
                if (cartItem) {
                  cartItem.quantity++;
                } else {
                  cart.cartItems.push({ product_id: productId ,name: product_name});
                }
                await cart.save();
            } 
        
            return res.status(200).json({message:"Product added to cart"})
           
        }
        catch(error){
            return res.status(401).send({message:"unauthorized"})
        }

}


const viewCart = async(req,res)=>{
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user_id: userId }).populate('cartItems.product_id');
        res.json(cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Error fetching cart');
      }
}



module.exports = {addCartProduct,viewCart};