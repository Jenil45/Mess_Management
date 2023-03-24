import express from 'express'
import userRoute from './Routes/userRoute.js'
import authRoute from './Routes/authRoute.js'
import planRoute from './Routes/planRoute.js'
import menuRoute from './Routes/menuRoutes.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { corsOptions } from './config/corsOptions.js'
// import jwt  from 'jsonwebtoken';

dotenv.config()

// connect to a database
import Connection from './Database/db_connect.js'


// create an express app for request-response
const app = express()

// giving all permissions
app.use(express.json())
app.use(bodyParser.json({extended : true}))
// app.use(bodyParser.urlencoded({extended : true}))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/users",userRoute)
app.use("/auth",authRoute)
app.use("/plan",planRoute)
app.use("/menu",menuRoute)



// get requests

Connection()

app.get("/" , (req,res) => {
    
    const today_date = new Date()
    const end_date = new Date()
    // const end_date = new Date(today_date.setDate(today_date.getDate+10))
    end_date.setDate(end_date.getDate()+10)
    console.log(today_date.getDate());
    console.log(end_date.getDate());
    console.log((end_date-today_date)/(1000 * 60 * 60 * 24));
    res.send("Hello")
})

// listening app on given port
app.listen(process.env.PORT , () => {console.log(`Server is running....`)})