const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// cream un user schema. schema e ca un constructor pentru o clasa

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
        unique:true
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
        default:false
	},
},{
    // Acest obiect adauga created at si modified at in schema userului
    timestamps:true
});


userSchema.methods.matchPassword = async function(enteredPassword){
	return await bcrypt.compare(enteredPassword,this.password)
}

// Dupa ce cream schema, cream un model cu mongoose.model() 

const User = mongoose.model('User',userSchema)

module.exports = User;