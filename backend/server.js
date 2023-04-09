// Entry point for BE
const express = require('express');
const dotenv = require('dotenv');
const connectDB  = require('./config/db');
const products = require('./data/products')

dotenv.config()


connectDB();

const app = express();

app.get('/', (req,res)=>{
    res.send('API is running')
})


app.get("/api/products", (req, res) => {
	// When we send json we do. res.json converts the content type to a json :) 
    res.json(products)
});

//  route with param

app.get("/api/products/:id", (req, res) => {
	// We can get the parameters of a request with req.params :) )
	const product = products.find(p => p._id === req.params.id)
    res.json(product);
});

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))