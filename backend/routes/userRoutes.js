const express = require("express");
// importam async handler
const asyncHandler = require("express-async-handler");
// cream un router.
const router = express.Router();
// Aducem modelul User

const User = require("../models/userModel");

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
            token:null
        })
    } else {
        res.status(401).json({
            message:'Invalid email or password'
        })
      
    }
})
);

module.exports = router;
