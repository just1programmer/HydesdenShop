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

    
    
})
);

module.exports = router;
