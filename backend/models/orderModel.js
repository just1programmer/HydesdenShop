const mongoose = require("mongoose");

// cream un order schema. schema e ca un constructor pentru o clasa

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		orderItems: [
			{
				name: {
					type: String,
					required: true,
				},
				qty: {
					type: Number,
					
				},
				image: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
			},
		],
		shippingAddress: {
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			postalCode: {
				type: String,
				required: true,
			},
			country: {
				type: String,
				required: true,
			},
		},
		paymentMethod: {
			type: String,
			
		},
		// paymentResult vine de la Paypal
		paymentResult: {
			id: {
				type: String,
			},
			status: {
				type: String,
			},
			update_time: {
				type: String,
			},
			email_address: {
				type: String,
			},
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		// Acest obiect adauga created at si modified at in schema orderului
		timestamps: true,
	}
);

// Dupa ce cream schema, cream un model cu mongoose.model()

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
