const express = require("express");
// importam async handler
const asyncHandler = require("express-async-handler");
// cream un router.
const router = express.Router();
// Aducem modelul User
const User = require("../models/userModel");

const tokenModule = require("../utils/generateToken");

//  importam protect - pentru a proteja unele rute in cazul in care nu suntem autentificati 

const protect = require('../middleware/authMiddleware')

//  @description Request pentru autentificarea userului si pt a primi token de autorizare
//  @route POST /api/users/login
//  @access  Public
router.post('/login', asyncHandler(async(req,res)=>{

    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token: tokenModule.generateToken(user._id)
        })
    } else {
        res.status(401).json({
            message:'Invalid email or password'
        })
    }
})
);



//  @description Request pentru a primi profilul userului
//  @route GET /api/users/profile
//  @access  Private
router.get('/profile',protect.protect, asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
				});
    }else{
        res.status(401)
    }
}
));



module.exports = router;
