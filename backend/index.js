import express from 'express'
import userRoute from './Routes/userRoute.js'
import authRoute from './Routes/authRoute.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
// import cors from 'cors'
import dotenv from 'dotenv'
// import jwt  from 'jsonwebtoken';

dotenv.config()

// connect to a database
import Connection from './Database/db_connect.js'

// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     // optionSuccessStatus:200,
// }

// create an express app for request-response
const app = express()

// giving all permissions
app.use(express.json())
app.use(bodyParser.json({extended : true}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser())
app.use("/users",userRoute)
app.use("/auth",authRoute)
// app.use(cors(corsOptions))



// get requests

Connection()

app.get("/" , (req,res) => {
    res.send("Hello")
})

// listening app on given port
app.listen(process.env.PORT , () => {console.log(`Server is running....`)})