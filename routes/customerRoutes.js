import express from 'express'
import { customerLogin, customerRegister } from '../controllers/customerUserCtrl.js'


const customerUser = express.Router()


customerUser.post("/register", customerRegister)
customerUser.post("/login", customerLogin)

export default customerUser