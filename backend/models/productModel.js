const mongoose = require("mongoose");

// Cream reviews Schema

const reviewSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
},{
    timestamps:true
});



// cream un product schema. schema e ca un constructor pentru o clasa

const productSchema = mongoose.Schema(
	{
		user: {
			// punem user aici ca sa stim care user a creat produsul.
			// ca si tip punem mongoose.Schema.Types.ObjectId astfel ne ia userul .
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			// Trebuie sa facem o referinta la un model specific - adica User
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},

        // aici facem reviews la produs.
        reviews:[reviewSchema],

		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		// Acest obiect adauga created at si modified at in schema produsului
		timestamps: true,
	}
);

// Dupa ce cream schema, cream un model cu mongoose.model()

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
