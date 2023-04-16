const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

//  @description Request pentru toate produsele
//  @route GET /api/products
//  @access  Public
const getProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find({})
    res.json(products)
})

//  @description Request pentru un produs
//  @route GET /api/products/:id
//  @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

module.exports = {getProducts,getProductById};