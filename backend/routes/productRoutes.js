const express = require('express')
// importam async handler
const asyncHandler = require('express-async-handler')
// cream un router.
const router = express.Router();
// Aducem modelul Product

const Product = require('../models/productModel');

//  @description Request pentru toate produsele
//  @route GET /api/products
//  @access  Public
router.get("/", asyncHandler(async (req, res) => {
	// When we send json we do. res.json converts the content type to a json :)
    // Product.find({}) - daca pune un empty object , ne va returna toata colectia Product. :)
    const products = await Product.find({})
	res.json(products);
}));

//  @description Request pentru un produs
//  @route GET /api/products/:id
//  @access  Public
router.get("/:id", asyncHandler(async(req, res) => {
	// We can get the parameters of a request with req.params :) )
	const product = await Product.findById(req.params.id)
    if(product){
        res.json(product);
    }else{
        res.status(404);
        throw new Error('Product not found')
    }
}));

module.exports = router;