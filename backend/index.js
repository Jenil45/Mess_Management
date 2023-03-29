import express from 'express'
import userRoute from './Routes/userRoute.js'
import DailyEntry from "./Models/DailyEntry.js";
import authRoute from './Routes/authRoute.js'
import planRoute from './Routes/planRoute.js'
import menuRoute from './Routes/menuRoutes.js'
import userplanRoute from './Routes/userPlanRoutes.js';
import dailyentryRouter from './Routes/dailyentryRoute.js';
import statisticsRoute from './Routes/statisticsRoute.js';
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
app.use("/stats", statisticsRoute)

// get requests

Connection()

app.get("/" , async (req,res) => {

    const today_date = moment().utcOffset("+05:30").startOf('month').toDate()
    const end_date1 = moment().utcOffset("+05:30").endOf('month').toDate()
    const users = await DailyEntry.aggregate([
        {
            $match: {
                "attendance": {
                  "$elemMatch": {
                    "date": 
                          {$gte : today_date ,$lte : end_date1},
                    "menu.breakfast":true
                    }
                  }
                }
        },
            {
                $unwind : {path:'$attendance'}
            },
            {
                $group : {
                    _id: "$attendance.date",
                    Users : { $push : '$attendance'}
                }
            },
            {
                $group : {
                    _id:"$_id",
                    count:{$count: {}}
                }
            }
        ]
        )

    function groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
          var key = obj[property];
          key = moment(key).startOf('date').get('date')
        //   console.log(obj);
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
      }
      
    var groupedPeople = groupBy(users, '_id');
    groupedPeople  = Object.entries(groupedPeople).map(entry => {
        return {"date": entry[0],"value": entry[1].length};
      });
      console.log(groupedPeople);
      res.send(groupedPeople)
})

app.get("/date" , (req,res) => {

    const today_date = moment().utcOffset("+05:30").startOf('month').toDate()
    const end_date1 = moment().utcOffset("+05:30").endOf('month').toDate()
    // const end_date1 = moment(today_date).utcOffset("+05:30").add(1,'days').startOf('day').toDate()
    // const end_date2 = moment(today_date).utcOffset("+05:30").add(6,'days').endOf('day').toDate()
    // const end_date3 = moment(today_date).utcOffset("+05:30").add(29,'days').endOf('day').toDate()
    console.log(today_date , end_date1);
    res.send("hello")
})

// listening app on given port
app.listen(process.env.PORT , () => {console.log(`Server is running....`)})