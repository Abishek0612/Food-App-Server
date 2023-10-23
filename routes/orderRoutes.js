import express from 'express'
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderCtrl.js'
import { customerIsLoggedIn } from '../middlewares/customerIsLoggedIn.js'
import { restaurantOwnerIsLoggedIn } from '../middlewares/restaurantIsLoggedIn.js'


const orderRoutes = express.Router()


orderRoutes.post('/place-order',customerIsLoggedIn, createOrder)
orderRoutes.get('/fetch-order', getOrders)
orderRoutes.put('/update-order-status/:orderId', restaurantOwnerIsLoggedIn, updateOrderStatus);


export default  orderRoutes

