const express = require('express')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const Order = require('../models/Order.js')
const router = express.Router()


//Create
router.post('/',verifyToken,async(req,res)=>{
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }

})


//Update
router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})


//Delete
router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
})


//Get User Orders
router.get('/find/:userId',verifyTokenAndAuthorization,async(req,res)=>{
    try { 
        const orders = await Order.find({userId: req.params.userId})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})


// //Get All
router.get('/',verifyTokenAndAdmin,async(req,res)=>{
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get Monthly Income
//it give income per month number denotes as number and income as total

router.get('/income',verifyTokenAndAdmin,async(req,res)=>{
    //comparing this month and last month
    const date = new Date() //current date
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); //one month back current date
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); //two month back current date

    try {
        const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
        ])
        res.status(200).send(income)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports= router