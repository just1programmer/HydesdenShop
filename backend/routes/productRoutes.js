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



//  @description Request pentru a sterge un produs
//  @route DELETE /api/products/:id
//  @access  Private/Admin
router.delete("/:id", asyncHandler(async(req, res) => {
	// We can get the parameters of a request with req.params :) )
	const product = await Product.findById(req.params.id)
    if(product){
        await Product.deleteOne(product)
        res.json({
            message:'Product removed'
        })
    }else{
        res.status(404);
        throw new Error('Product not found')
    }
}));


//  @description Request pentru a crea un produs
//  @route POST /api/products
//  @access  Private/Admin
router.post("/", asyncHandler(async(req, res) => {
    const product = new Product({
        name: 'Nume produs',
        price: 0,
        user : req.user._id,
        image: '/images/sample.jpg',
        brand: 'Nume Brand',
        category: 'Nume categorie',
        countInStock: 0,
        numReviews: 0,
        description: 'Descriere...'
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
}));



//  @description Request pentru a updata un produs
//  @route PUT /api/products/:id
//  @access  Private/Admin
router.put("/:id", asyncHandler(async(req, res) => {
   
    const {name,price,description,image,brand,category,countInStock} = req.body

    const product = await Product.findById(req.params.id)
    if(product){

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
	res.json(updatedProduct);
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
  
}));




module.exports = router;