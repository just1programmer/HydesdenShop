const express = require("express");
const path = require('path')
const multer = require("multer");
// importam async handler
const asyncHandler = require("express-async-handler");
// cream un router.
const router = express.Router();
// Aducem modelul User
const Order = require("../models/orderModel");
const protect = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
    
    // unde o sa stocam fisiere uploadate . 
    // prima data este functia destination. apelam callbackul, dam null ca si parametru pentru eroare
    destination(req,file,cb){
        cb(null,'uploads/')
    },

    // functia filename -- cu ea precizam numele fisierului pe care il uploadam. 
    filename(req,file,cb){
        // cream un fisier cu nume dinamic. !! cu tot cu extensie
        cb(null,`${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`)
    }
})
 

function checkFileType(file,cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null,true)
    }else{
        cb('Images only!')
    }
}


const upload = multer({
    storage,
    // filtreaza ce fel de fisiere acceptam
    fileFilter: function (req,file,cb){
        checkFileType(file,cb)
    }
})


router.post('/',upload.single('image'),(req,res)=>{
    res.send(`/${req.file.path}`)
})


module.exports = router;
