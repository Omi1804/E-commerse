const express = require('express')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const User = require('../models/User')
const router = express.Router()

//update
router.put('/:id',verifyTokenAndAuthorization,async(req,res)=>{

    //checking for passwords
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SECRET_KEY
            ).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
})


//Get User
router.get('/find/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json({others})
    } catch (error) {
        res.status(500).json(error)
    }
})


//Get All User
router.get('/',verifyTokenAndAdmin,async(req,res)=>{
    
    const query = req.query.new //-->to find latest users

    try {
        //if we pass new to the query in URL then it will give recent 3 users that added
        const users = query
        ? await User.find().sort({_id:-1}).limit(3)
        : await User.find(req.params.id)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get User Stats
//This whole basically returns us how many users has registered in which month...it give month as id in number eg: 1 for january and total for total registers
router.get('/stats',verifyTokenAndAdmin,async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1)); //it gives the extact date one year back

    try {
        
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project:{
                    month:{ $month: "$createdAt"},
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum: 1}
                }
            }
        ])
        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports= router