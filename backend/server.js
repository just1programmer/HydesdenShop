// Entry point for BE
const express = require('express');
const products = require('./data/products')

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

app.listen(5000, console.log('Server running on port 5000'))