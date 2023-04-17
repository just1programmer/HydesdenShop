const express = require("express");
// importam async handler
const asyncHandler = require("express-async-handler");
// cream un router.
const router = express.Router();
// Aducem modelul User
const Order = require("../models/orderModel");
const protect = require("../middleware/authMiddleware");



//  @description Crearea unei noi comenzi
//  @route POST /api/orders
//  @access  Private
router.post("/",protect.protect, asyncHandler(async (req, res) => {

const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body

if(orderItems && orderItems.length ===0){
    res.status(400)
    throw new Error('No order items')
    return;
}else{
    const order = new Order({
			orderItems,
            user:req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

        const createdOrder = await order.save();
        res.status(201).json(createdOrder)
}

}));


//  @description Request pentru a primi o comanda - prin ID 
//  @route GET /api/orders/:id
//  @access  Private

router.get("/:id",protect.protect, asyncHandler(async (req, res) => {
	
	const order = await Order.findById(req.params.id).populate('user','name email')

	if(order){
		res.json(order)
	}else{
		res.status(404)
		throw new Error('Order not found')
	}

}));


module.exports= router