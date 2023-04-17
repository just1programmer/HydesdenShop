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



//  @description Primim comenzile userului logat
//  @route GET /api/orders/myorders
//  @access  Private

router.get("/myorders",protect.protect, asyncHandler(async (req, res) => {
	

	console.log(req.body)

	const orders = await Order.find({user: req.user.id})
	console.log('============== ORDERS /MYORDERS ',orders)
	res.json(orders)

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



//  @description Updatare plata comanda
//  @route PUT /api/orders/:id/pay
//  @access  Private

router.put("/:id/pay",protect.protect, asyncHandler(async (req, res) => {
	
	const order = await Order.findById(req.params.id)

	if(order){
		order.isPaid = true
		order.paidAt = Date.now();

		// aceste date vin din Paypal API
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time:req.body.update_time,
			email_address: req.body.payer.email_address
		}
		const updatedOrder = await order.save();
		res.json(updatedOrder)
	}else{
		res.status(404)
		throw new Error('Order not found')
	}

}));




module.exports= router