import express from 'express'
import userRoute from './Routes/userRoute.js'
import DailyEntry from "./Models/DailyEntry.js";
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

app.get("/" , async (req,res) => {

    // const today_date = new Date()
    // const end_date = new Date()
    // // const end_date = new Date(today_date.setDate(today_date.getDate+10))
    // end_date.setDate(end_date.getDate()+10)
    // console.log(today_date.getDate());
    // console.log(end_date.getDate());
    // console.log((end_date-today_date)/(1000 * 60 * 60 * 24));

    const {userId , verifyThing } = req.body
    // Does the user exist to update?
    const user = await DailyEntry.findOne({"userId":userId}).exec()

    if (!user) {
            return res.status(400).json({ message: 'User not found'});
    }


    console.log(user);
    const date = new Date()

    const isTodayAdded = user.attendance.filter(item => {
        console.log(item.date);
        if( item.date.getDate()===date.getDate() && item.date.getMonth()===date.getMonth() && item.date.getYear()===date.getYear())
        {
            return item
        }
    });
    const length = isTodayAdded.length
    var updatedObject={}
    console.log(isTodayAdded[0]);
    if(verifyThing==="breakfast")
    {
        updatedObject = {"breakfast":true , "lunch":length==0?false:isTodayAdded[0].menu.lunch , "dinner":length==0?false:isTodayAdded[0].menu.dinner }
    }
    else if(verifyThing==="lunch")
    {
        updatedObject = {"breakfast": length==0?false:isTodayAdded[0].menu.breakfast, "lunch":true , "dinner":length==0?false:isTodayAdded[0].menu.dinner }

    }
    else if(verifyThing==="dinner"){
        updatedObject = {"breakfast": length==0?false:isTodayAdded[0].menu.breakfast, "lunch":length==0?false:isTodayAdded[0].menu.lunch , "dinner":true }
    }
    else
    {
        // const updatedObject = {"breakfast": isTodayAdded[0].menu.breakfast, "lunch":isTodayAdded[0].menu.lunch , "dinner":true }
        res.json("No verify thing is access")
    }

    console.log(updatedObject);

    if(isTodayAdded.length === 1)
    {



        const updateEntry = await DailyEntry.updateOne({"userId":userId } , {
            $set:{
                "attendance.$[elemX].menu" : updatedObject
            }},
            {
                "arrayFilters" : [{"elemX.date":isTodayAdded[0].date}]
            }
        )
        // console.log(updateEntry.modifiedCount===1);
        // if(updateEntry.modifiedCount===1)
        // {
        //     res.send("Data updated of this")
        // }
        // else
        // {
        //     res.send("Some error occur")
        // }
    }

    else
    {



        console.log("Print this");
        const today_date = new Date();
        console.log(today_date);
        const dailyEntryObject = {"date":today_date , "menu":updatedObject}

        const updateEntry = await DailyEntry.updateOne({"userId":userId } , {
            $push:{
                "attendance":dailyEntryObject
            }},
        )
    }



    res.send("Hello")
})

app.get("/date" , (req,res) => {
    const date = new Date();
    const newDate = new Date();
    newDate.setDate(newDate.getDate()-1)
    console.log(newDate);
})

// listening app on given port
app.listen(process.env.PORT , () => {console.log(`Server is running....`)})