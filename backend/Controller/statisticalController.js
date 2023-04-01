import UserPlan from "../Models/UserPlan.js";
import asyncHandler from 'express-async-handler'
import moment from "moment";
import DailyEntry from "../Models/DailyEntry.js";
import Inventory from "../Models/Inventory.js";


export const getPlanCount = asyncHandler(async (req , res) => {

  const today_date = moment().utcOffset("+05:30").startOf('month').startOf('week').toDate()
  const end_date1 = moment().utcOffset("+05:30").endOf('month').endOf('week').toDate()
  // console.log(today_date);
  // console.log(end_date1);

    const user = await UserPlan.aggregate(
        [{
            $match : {
                "start_date":{$gte:today_date , $lte:end_date1},
            }
        },
        {
            $group: {
                _id: "$planId",
                name: {$first : "$planId"},
                count: { $count: { } }
             }
        },
        {
          $sort:{"planId":1}
        }
    ]
        )
    
    if(!user)
    {
        return res.json({message:"No user found for today"})
    }

    res.json(user)
})

export const getDayMemebr = asyncHandler(async (req , res) => {
    const today_date = moment().utcOffset("+05:30").startOf('month').startOf('week').toDate()
    const end_date1 = moment().utcOffset("+05:30").endOf('month').endOf('week').toDate()
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
      // console.log(groupedPeople);
    res.json(groupedPeople)
})

export const getWeekProfit = asyncHandler(async (req , res) => {
    const today_date = moment().utcOffset("+05:30").startOf('week').toDate()
    const end_date1 = moment().utcOffset("+05:30").endOf('week').toDate()
    // console.log(today_date);
    // console.log(end_date1);

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
              key = (moment(key).startOf('date').get('date'))
              // console.log(key);
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
export const getMonthlyExpenses = asyncHandler(async (req , res) => {
  const today_date = moment().utcOffset("+05:30").startOf('month').startOf('week').toDate()
  const end_date1 = moment().utcOffset("+05:30").endOf('month').endOf('week').toDate()

  const expenses = await Inventory.aggregate([
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
          name: {$first : "$storeType"},
          expense : { $sum : '$sub_total'},
          qty : { $sum : '$qty'},
          remainqty : { $sum : '$remainqty'},
        }
      },
      {
        $sort:{"storeType":1}
      }

      ]
      )
      // console.log(expenses);
    res.send(expenses)
})