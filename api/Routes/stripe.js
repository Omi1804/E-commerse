//this route is for payment gateway system
const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SEC_KEY);

router.post('/payment',(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount: req.body.amount,
        currency: "INR"
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
            console.log(stripeErr)
        }else{
            res.status(200).json(stripeRes);
        }
    })
})


module.exports = router


