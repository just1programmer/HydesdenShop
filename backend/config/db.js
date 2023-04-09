const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser: true,
        })
        console.log(`MongoDB Connected : ${connection.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        // Exit with failure
        process.exit(1)
    }
}

module.exports = connectDB;