import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/db.js'
dotenv.config()
dbConnect()

const app = express()

app.use(cors())

app.use(express.json())


const PORT = process.env.PORT || 6000
app.listen (PORT,
    console.log(`Server is listening on PORT ${PORT}`))
