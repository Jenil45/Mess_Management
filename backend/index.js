import express from 'express'
import userRoute from './Routes/userRoute.js'
import DailyEntry from "./Models/DailyEntry.js";
import authRoute from './Routes/authRoute.js'
import planRoute from './Routes/planRoute.js'
import menuRoute from './Routes/menuRoutes.js'
import userplanRoute from './Routes/userPlanRoutes.js';
import dailyentryRouter from './Routes/dailyentryRoute.js';
import statisticsRoute from './Routes/statisticsRoute.js';
import inventoryRoute from './Routes/inventoryRoutes.js';
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
import Inventory from './Models/Inventory.js';


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
app.use("/inventory", inventoryRoute)

// get requests

Connection()

app.get("/" , async (req,res) => {

    const today_date = moment().utcOffset("+05:30").startOf('month').toDate()
    const end_date1 = moment().utcOffset("+05:30").endOf('month').toDate()
    const users = await Inventory.aggregate([
        {
            $match:
            {
              "date" : {$gte : today_date ,$lte : end_date1}
            }
        },

        {
          $group : 
          {
            _id: "$storeType",
            Expense : { $sum : '$sub_total'}
          }
        },

        ]
        )

      res.send(users)
})

app.get("/date" , async (req,res) => {

    const today_date = moment().utcOffset("+05:30").startOf('week').toDate()
    const end_date1 = moment().utcOffset("+05:30").endOf('week').toDate()
    console.log(today_date);
    console.log(end_date1);

    const user = await UserPlan.aggregate(
        [{
            $match : {
                "start_date":{$gte:today_date , $lte:end_date1},
                // "end_date":{$gte:today_date},
            }
        },
        {
            $group: {
                _id: "$start_date",
                totalamount: { $sum: "$fees" }
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
          
        var groupedPeople = groupBy(user, '_id');
        groupedPeople  = Object.entries(groupedPeople).map(entry => {
            return {"date": entry[0],"amount": entry[1][0].totalamount};
            // console.log(entry[1][0]);
          });
        res.json(groupedPeople)
})

// listening app on given port
app.listen(process.env.PORT , () => {console.log(`Server is running....`)})