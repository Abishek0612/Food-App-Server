import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/db.js'
import restaurantUser from './routes/restaurantRoutes.js'
import customerUser from './routes/customerRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config()
dbConnect()

const app = express()

app.use(cors())

app.use(express.json())


///? Routes
app.use("/api/v1/restaurant", restaurantUser)
app.use("/api/v1/customer", customerUser)
app.use("/api/v1/order", orderRoutes)


const PORT = process.env.PORT || 6000
app.listen (PORT,
    console.log(`Server is listening on PORT ${PORT}`))
