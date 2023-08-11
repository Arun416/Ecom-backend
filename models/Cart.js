const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartItems: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number, default: 1 },
        name: {type:String},
        price : { type: Number },
      },
    ],
},{timestamps:true})

const productCart = mongoose.model('Cart',cartSchema)
module.exports = productCart;