import UserPlan from "../Models/UserPlan.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import moment from "moment";

export const getUserCurrentPlan = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  // const userId = 2002
  console.log(userId);
  const today_date = moment()
    .utcOffset("+05:30")
    .add(1, "days")
    .startOf("day")
    .toDate();
  // const today_date = moment().format()
  // today_date.setDate(today_date.getDate()+1)
  console.log(today_date);
  const user = await UserPlan.find({
    userId: userId,
    start_date: { $lte: today_date },
    end_date: { $gte: today_date },
  });
  // console.log(user);
  if (!user) {
    return res.status(400).json(user);
  }

  res.json(user[0]);
});

export const getCurrentPlan = asyncHandler(async (req, res) => {
  const today_date = new Date();
  // today_date.setDate(today_date.getDate())

  const user = await UserPlan.aggregate([
    {
      $group: {
        _id: "$_id",
        userId: { $first: "$userId" },
        planId: { $first: "$planId" },
        start_date: { $first: "$start_date" },
        end_date: { $first: "$end_date" },
        fee_status: { $first: "$fee_status" },
      },
    },
    {
      $sort: { userId: 1 },
    },
  ]);
  if (!user) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(user);
});

export const addUserPlan = asyncHandler(async (req, res) => {
  // read data from req body
  const { userId, planId, fees } = req.body;

  // creating userObject
  const userPlanObject = { userId, planId, fees };

  // Create and store new user
  const userplan = await new UserPlan(userPlanObject).save();

  if (userplan) {
    //created
    return res.status(201).json({
      message: `New user plan for user ${userId} created of plan ${planId}`,
    });
  } else {
    return res.status(400).json({ message: "Invalid user data received" });
  }
});

export const updateUserPlan = asyncHandler(async (req, res) => {
  const { userId, planId } = req.body;
  console.log(req.body);

  // Does the user exist to update?
  const user = await UserPlan.findOne({
    userId: userId,
    planId: planId,
  }).exec();

  if (!user) {
    return res.status(400).json({ message: "User Plan not found" });
  }

  const updatefeeStatus = await UserPlan.updateOne(
    { userId, planId },
    { fee_status: true }
  );
  console.log("updated ", updatefeeStatus);
  res.json({ message: `${updatefeeStatus.userId} fee status updated` });
});

export const updateConsent = asyncHandler(async (req, res) => {
  var { userId, planId, date, breakfast, lunch, dinner } = req.body;
  // console.log(req.body);
  // console.log(date);
  var date = new Date(date);
  // console.log(date);
  date = moment(date).utcOffset("+05:30").startOf("day").toDate();
  console.log(date);

  const updatedObject = { date, breakfast, lunch, dinner };
  const updateConsent = await UserPlan.updateOne(
    { userId, planId },
    {
      $set: {
        "isavailable.$[elemX]": updatedObject,
      },
    },
    {
      arrayFilters: [{ "elemX.date": date }],
    }
  );
  console.log("updated ", updateConsent);
  res.json({ message: `${userId} consent status updated` });
});

// export const deleteUser = asyncHandler(async (req, res) => {
//     const { email } = req.body

//     // Confirm data
//     if (!email) {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     // Does the user exist to delete?
//     const user = await User.findOne({email}).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     const result = await User.deleteOne({email})

//     const reply = `Username ${result.email} deleted`

//     res.json({message: reply})
// })

export const getConsent = asyncHandler(async (req, res) => {
  var data = JSON.parse(req.params.obj);
  // console.log(data);
  // date = new Date(date)
  // console.log(data.userId);
  // console.log(data.planId);
  // console.log(data.date);
  var date = data.date;
  console.log(date);
  var userId = data.userId;
  var planId = data.planId;
  date = moment(date).utcOffset("+05:30").startOf("day").toDate();
  console.log(date);

  const getConsent = await UserPlan.findOne(
    { userId, planId, "isavailable.date": date },
    {
      _id: 0,
      isavailable: { $elemMatch: { date: date } },
    }
  );
  console.log(getConsent);
  res.json(getConsent);
});

export const getUserTodayPlan = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  var today_date = new Date();
  today_date = moment(today_date).utcOffset("+05:30").startOf("day").toDate();
  console.log(today_date);
  const user = await UserPlan.find(
    {
      userId: userId,
      start_date: { $lte: today_date },
      end_date: { $gte: today_date },
      "isavailable.date": today_date,
    },
    {
      _id: 0,
      userId: 1,
      planId: 1,
      fees: 1,
      fee_status: 1,
      isavailable: { $elemMatch: { date: today_date } },
    }
  );
  // console.log(user);
  if (!user) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(user);
});

export const getTodayStudents = asyncHandler(async (req, res) => {
  const type = req.params.type;
  // console.log(type);
  var today_date = new Date();
  // today_date = moment(today_date).utcOffset()
  today_date = moment(today_date).utcOffset("+05:30").startOf("day").toDate();

  // today_date.setDate(today_date.getDate())
  var user;
  // console.log(today_date);
  if (type === "Breakfast") {
    user = await UserPlan.aggregate([
      {
        $match: {
          start_date: { $lte: today_date },
          end_date: { $gte: today_date },
          isavailable: {
            $elemMatch: {
              date: today_date,
              breakfast: true,
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          planId: { $first: "$planId" },
          fee_status: { $first: "$fee_status" },
        },
        // "fee_status" : {$first : "$fee_status"}},
        // "fee_status" : {$first : "$fee_status"}},
      },
      {
        $sort: { userId: 1 },
      },
    ]);
  }
  if (type === "Lunch") {
    user = await UserPlan.aggregate([
      {
        $match: {
          start_date: { $lte: today_date },
          end_date: { $gte: today_date },
          isavailable: {
            $elemMatch: {
              date: today_date,
              lunch: true,
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          planId: { $first: "$planId" },
          fee_status: { $first: "$fee_status" },
        },
        // "fee_status" : {$first : "$fee_status"}},
        // "fee_status" : {$first : "$fee_status"}},
      },
      {
        $sort: { userId: 1 },
      },
    ]);
  }
  if (type === "Dinner") {
    user = await UserPlan.aggregate([
      {
        $match: {
          start_date: { $lte: today_date },
          end_date: { $gte: today_date },
          isavailable: {
            $elemMatch: {
              date: today_date,
              dinner: true,
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          planId: { $first: "$planId" },
          fee_status: { $first: "$fee_status" },
        },
        // "fee_status" : {$first : "$fee_status"}},
        // "fee_status" : {$first : "$fee_status"}},
      },
      {
        $sort: { userId: 1 },
      },
    ]);
  }

  if (!user) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(user);
});
