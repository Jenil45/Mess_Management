import UserPlan from "../Models/UserPlan.js";
import asyncHandler from 'express-async-handler'
import moment from "moment";
import DailyEntry from "../Models/DailyEntry.js";


export const getPlanCount = asyncHandler(async (req , res) => {

    const today_date = new Date()

    const user = await UserPlan.aggregate(
        [{
            $match : {
                "start_date":{$lte:today_date},
                "end_date":{$gte:today_date},
            }
        },
        {
            $group: {
                _id: "$planId",
                count: { $count: { } }
             }
        }
    ]
        )
    
    if(!user)
    {
        res.json({message:"No user found for today"})
    }

    res.json(user)
})

export const getDayMemebr = asyncHandler(async (req , res) => {
    const today_date = moment().utcOffset("+05:30").startOf('month').toDate()
    const end_date1 = moment().utcOffset("+05:30").endOf('month').toDate()
    const users = await DailyEntry.aggregate([
        {
            $match: {
                "attendance": {
                  "$elemMatch": {
                    "date": 
                          {$gte : today_date ,$lte : end_date1}
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
    res.json(groupedPeople)
})

