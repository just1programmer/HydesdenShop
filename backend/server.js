// Entry point for BE
const express = require('express');
const dotenv = require('dotenv');
const connectDB  = require('./config/db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

dotenv.config()
connectDB();

const app = express();
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('API is running')
})

// Aici efectiv facem un routing. zicem ca daca avem un request catre /api/products, sa folosim routerul din productRoutes
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))