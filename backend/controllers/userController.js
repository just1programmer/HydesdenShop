const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require('../utils/generateToken')

//  @description Autentifica userul si primeste un token
//  @route POST /api/user/login
//  @access  Public
const authUser = asyncHandler(async (req, res) => {
// in primu rand trebuie sa primim data de la body-ul requestului.
    const {email,password} = req.body
    const user = await User.findOne({email:email})

    // verificam daca exista user cu emailul si parola pe care le dam in formularul de login
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
});



//  @description Inregistrarea unui user
//  @route POST /api/user/register
//  @access  Public
const registerUser = asyncHandler(async (req, res) => {

    const {name,email,password} = req.body

    // Aici verificam daca exista deja un user cu acelasi eamil
    const userExists = await User.findOne({email:email})
    if(userExists){
        res.status(400);
        throw new Eror('User already exists')
    }


    // Aici , in cazul in care nu exista deja un user, cream unul.

    const user = await User.create({name,email,password})
    if(user){
        res
					.status(201)
					.json({
						_id: user._id,
						name: user.name,
						email: user.email,
						isAdmin: user.isAdmin,
						token: generateToken(user._id),
					});
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
});





//  @description primeste profilul userului
//  @route GET /api/user/profile
//  @access  Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if(user){
        res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }
        )
    }else{
        res.status(404)
        throw new Error('User not found')
    }
    res.send('success')

});



module.exports = {authUser,getUserProfile,registerUser}