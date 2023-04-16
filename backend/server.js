// Entry point for BE
const express = require('express');
const dotenv = require('dotenv');
const connectDB  = require('./config/db');
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config()
connectDB();

const app = express();
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('API is running')
})

// Aici efectiv facem un routing. zicem ca daca avem un request catre /api/products, sa folosim routerul din productRoutes
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes)
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))