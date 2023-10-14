import express from 'express'
import { createOrder, getOrders } from '../controllers/orderCtrl.js'


const orderRoutes = express.Router()


orderRoutes.post('/place-order', createOrder)
orderRoutes.get('/fetch-order', getOrders)

export default  orderRoutes

