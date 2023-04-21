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
    console.log(req.params)
    const product = await Product.findById(req.params.id)
    // DANGER ---> NU MERGE req.params._id !! folosesc .id in loc !!! 
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




//  @description Request pentru a crea un nou review
//  @route PUT /api/products/:id/reviews
//  @access  Private
router.post("/:id/reviews", asyncHandler(async(req, res) => {
    
    const {
        rating,comment
    } = req.body
 
    console.log(typeof(rating))
    const product = await Product.findById(req.params.id)
    // DANGER ---> NU MERGE req.params._id !! folosesc .id in loc !!! 
    if(product){

        if(res.status ===500){
            res.json({message:'Produsul are deja un review de la tine'})
        }
        // daca e problema, foloses id in loc de _id
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.body.user.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed');
        }
        const review = {
            name: req.body.name,
            rating: Number(rating),
            comment,
            user:req.body.user
        
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length;

        console.log(product.reviews)
        
        let sumOfRating = 0;

        product.reviews.forEach(review => {
            sumOfRating += review.rating
        });

        console.log(sumOfRating)

        product.rating = sumOfRating/product.reviews.length;
        // product.rating =
		// 			product.reviews.reduce((acc, item) => {
		// 				console.log("ITEM : ", item);
		// 				console.log("ACC : ", acc);
		// 				Number(item.rating) + Number(acc);
		// 			}, 0) / product.reviews.length;

        
        
        
   
        // console.log(product.rating)
        await product.save();
        res.status(201).json({
            message: 'Review added'
        })
    }else{
        res.status(404)
        throw new Error({
            message:'Trebuie sa fii logat ca sa poti lasa un review'
        })
    }
  
}));




module.exports = router;