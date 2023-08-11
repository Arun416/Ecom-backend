const {Schema,model} =  require('mongoose');

const productSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        quantity:{
            type: Number,
            required:true,
            default:0
        },
        price: {
            type:Number,
            required: true
        },
        category: { 
            type: String 
        },

        image : {
            type: String,
            required: false

        }},{ timestamps: true}
)

const product = model('Product',productSchema);

module.exports = product;