const product = require('../models/Product');
const Product = require('../models/Product');


const createProduct = async(req,res)=>{
    try {
        const product  = await Product.create(req.body);

        res.status(200).json({
            product
        })
    }
    catch(error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getProducts = async(req,res)=>{
    try {
        const product = await Product.find({});
        res.status(200).json({
            product
        })

    }
    catch(error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//get single product

const getProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            res.status(400).json({
                message:"product not found"
            })
        }
        res.status(200).json({
            product
        })

    }
    catch(error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//update a product

const updateProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const prod = await Product.findByIdAndUpdate(id,req.body);
        if(!prod){
            res.status(400).json({
                message:"product not found"
            })
        }
        const product = await Product.findById(id);

        res.status(200).json({
            product
        })

    }
    catch(error) {
        res.status(500).json({
            message:error.message
        })
    }
}


//delete a product 

const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const prod = await Product.findByIdAndDelete(id);
        if(!prod){
            res.status(400).json({
                message:"product not found"
            })
        }
        const product = await Product.findById(id);

        res.status(200).json({
            product
        })

    }
    catch(error) {
        res.status(500).json({
            message:error.message
        })
    }
}


const searchProducts = async(req,res)=>{
    var search = req.query.name;
    try {
        const query = search ? {"name":{$regex: ".*"+search+".*", $options: 'i'}} : {};

        const product_Data = await Product.find(query)
        if(product_Data.length > 0){
            res.status(200).json({
                message:"Product details",
                data: product_Data
            })
        }
        else {
            res.status(200).json({
                message:"No Product found"
            })
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}



module.exports = {createProduct,
                 getProducts,
                 getProduct,
                 updateProduct,
                 deleteProduct,
                 searchProducts}

