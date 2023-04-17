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
router.get('/profile',protect.protect,protect.admin, asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
				});
    }else{
        res.status(404)
        throw new Error('Denied')
    }
}
));




//  @description Request pentru a updata un user
//  @route PUT /api/users/profile
//  @access  Private
router.put(
	"/profile",
	protect.protect,
	asyncHandler(async (req, res) => {
		const user = await User.findById(req.user._id);

		if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email

            if(req.body.password){
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				token: tokenModule.generateToken(updatedUser._id),
			});
		} else {
			res.status(404);
            throw new Error('User not found')
		}
	})
);

//  @description Request pentru a inregistra un user
//  @route POST /api/users/regist
//  @access  Public
router.post('/', asyncHandler(async(req,res)=>{

    const {name, email, password } = req.body;
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('Userul exista deja')
    }

    const user = await User.create({
        name,email,password
    })

    if(user){
        res.status(201).json({
						_id: user._id,
						name: user.name,
						email: user.email,
						isAdmin: user.isAdmin,
						token: tokenModule.generateToken(user._id),
					});
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}
));



//  @description Request pentru a primi toti userii 
//  @route GET /api/users
//  @access  Private/Admin
router.get('/',protect.protect, asyncHandler(async(req,res)=>{
    const users = await User.find({})
    res.json(users)
}
));



module.exports = router;
