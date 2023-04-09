const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const connectDB = require('./config/db')

// trebuie sa apelam dotenv.config() in fiecare fisier care nu e legat de server si foloseste .env
dotenv.config();

connectDB(process.env.MONGO_URI);

// functie pentru importul datelor locale
const importData = async () =>{
    try {
        // deleteMany sterge tot din colectie
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // in prima faza stergem tot ce e in baza de date. acum importam ce avem noi local in products si users 

       const createdUsers = await User.insertMany(users)

    //  luam admin userul
    
    const adminUser = createdUsers[0]._id;
    
    const sampleProducts = products.map(product =>{
        return {...product,user:adminUser}
    })

    await Product.insertMany(sampleProducts);

    console.log('Data Imported! ')
    process.exit();
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
	try {
		// deleteMany sterge tot din colectie
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("Data Destroyed! ");
		process.exit();
	} catch (error) {
		console.log(`${error}`);
		process.exit(1);
	}
};

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}

module.exports ={
    destroyData,
    importData
}