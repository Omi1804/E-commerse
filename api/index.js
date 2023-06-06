const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 5500;

//Routes
const userRoute = require('./Routes/users.js')
const authRoute = require('./Routes/auth.js')
const productRoute = require('./Routes/product.js')
const cartRoute = require('./Routes/cart.js')
const orderRoute = require('./Routes/order.js')
const stripeRoute = require('./Routes/stripe.js')
const cors = require('cors')


//MONGOOSE SECTION --
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("DB connection successfull"))
    .catch((err)=>console.log(err))

app.use(cors())
app.use(express.json())
app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/products',productRoute)
app.use('/api/carts',cartRoute)
app.use('/api/orders',orderRoute)
app.use('/api/checkout',stripeRoute)





app.listen(PORT,()=>console.log(`BackEnd server is running at Port: ${PORT}`))
