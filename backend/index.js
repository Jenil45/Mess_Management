import express from 'express'
import userRoute from './Routes/userRoute.js'
import DailyEntry from "./Models/DailyEntry.js";
import authRoute from './Routes/authRoute.js'
import planRoute from './Routes/planRoute.js'
import menuRoute from './Routes/menuRoutes.js'
import userplanRoute from './Routes/userPlanRoutes.js';
import dailyentryRouter from './Routes/dailyentryRoute.js';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { corsOptions } from './config/corsOptions.js'
// import jwt  from 'jsonwebtoken';

dotenv.config()

// connect to a database
import Connection from './Database/db_connect.js'
import UserPlan from './Models/UserPlan.js';
import moment from 'moment/moment.js';


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
app.use("/userplan", userplanRoute)
app.use("/dailyentry", dailyentryRouter)

// get requests

Connection()

app.get("/" , async (req,res) => {

    // const today_date = moment().utcOffset("+05:30").add(1,'day').startOf('day').toDate()
    // const today_date = moment().utcOffset("+05:30").startOf('day').toDate()
    const today_date = new Date()

    // var today_date = moment().startOf('day').toDate()
    // today_date.setDate(today_date.getMinutes()-today_date.getMinutes());
    // today_date.setDate(today_date.getSeconds()-today_date.getSeconds());
    // console.log(today_date.getTime());
    // today_date.setDate(today_date.getTime() -today_date.getTime())
    // var today_date = today_date.getFullYear()+'-'+(today_date.getMonth()+1)+'-'+today_date.getDate(); 
    // res.send(date)
    console.log(today_date);

    // /////////////////

    const user = await UserPlan.aggregate(
        [{
            $match : {
                "start_date":{$lte:today_date},
                "end_date":{$gte:today_date},
                // "planID": 
            }
        },
        {
            $group : {
                "_id": "$userId",
                "planId":{"$first":"$planId"} ,
                "fee_status" : {$first : "$fee_status"},
                "date":{$first : "$start_date"},
                "date1":{$first : "$end_date"}
        }
        }
    ]
        )
    // console.log((new Date(user.date)).getDate());
    const date = new Date(user[0].date)
    console.log(date.getDate());
    if (!user) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(user)


})

app.get("/date" , (req,res) => {

    const today_date = moment().utcOffset("+05:30").subtract(1,'days').startOf('day').toDate()
    const end_date1 = moment(today_date).utcOffset("+05:30").add(0,'days').endOf('day').toDate()
    // const end_date1 = moment(today_date).utcOffset("+05:30").add(1,'days').startOf('day').toDate()
    const end_date2 = moment(today_date).utcOffset("+05:30").add(6,'days').endOf('day').toDate()
    const end_date3 = moment(today_date).utcOffset("+05:30").add(29,'days').endOf('day').toDate()
    const remaining_days1 = Math.round( moment.duration(moment(end_date1).diff(moment(today_date))).asDays());
    const remaining_days2 = Math.round( moment.duration(moment(end_date2).diff(moment(today_date))).asDays());
    const remaining_days3 = Math.round( moment.duration(moment(end_date3).diff(moment(today_date))).asDays());

    console.log(today_date);
    console.log(end_date1);
    console.log(end_date2);
    console.log(end_date3);
    console.log(remaining_days1);
    console.log(remaining_days2);
    console.log(remaining_days3);

    res.send("hello")
})

// listening app on given port
app.listen(process.env.PORT , () => {console.log(`Server is running....`)})