import moment from "moment";
import mongoose from "mongoose";
import validator from "validator";

const userplanSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: [true, "Please enter user id"],
    },
    subId: {
      type: Number,
      // required : [true , 'Please enter user id']
    },
    planId: {
      type: Number,
      required: [true, "Please enter plan id"],
    },
    start_date: {
      type: Date,
      // required : [true , "Please enter an contact number"],
    },
    end_date: {
      type: Date,
      // required : true
    },
    isavailable: [
      {
        date: {
          type: Date,
          // required : true
        },

        breakfast: {
          type: Boolean,
          // required : true,
          default: true,
        },
        lunch: {
          type: Boolean,
          // required : true,
          default: true,
        },
        dinner: {
          type: Boolean,
          // required : true,
          default: true,
        },
      },
    ],

    remaining_days: {
      type: Number,
      // required:true
    },
    fees: {
      type: Number,
      required: [true, "Please enter an password"],
    },
    fee_status: {
      type: Boolean,
      required: [true, "Please enter an confirm password"],
      enum: [false, true],
      default: false,
    },
  },
  { timestamps: true }
);
userplanSchema.pre("save", async function (next) {
  var docs = this;
  // console.log(docs);
  const data = await UserPlan.find();
  // console.log(data.length);

  docs.subId = docs.subId + data.length;
  // const today_date = new Date();

        //
        // const today = moment().utcOffset("+05:30").startOf('day').toDate()
        const today_date = moment().utcOffset("+05:30").add(1,'days').startOf('day').toDate()
        // const today_date = moment().utcOffset("+05:30").subtract(1,'days').startOf('day').toDate()
        console.log(today_date);
        var end_date = moment().utcOffset("+05:30").add(0,'days').endOf('day').toDate()
        //

  // const end_date = new Date();
  if (docs.planId === 501) {
    // end_date.setDate(end_date.getDate()+1)
    // const end_date = moment().utcOffset("+05:30").add(1,'days').endOf('day').toDate()
    end_date = moment(today_date)
      .utcOffset("+05:30")
      .add(0, "days")
      .endOf("day")
      .toDate();
  } else if (docs.planId === 502) {
    // end_date.setDate(end_date.getDate()+7)
    // const end_date = moment().utcOffset("+05:30").add(7,'days').endOf('day').toDate()
    end_date = moment(today_date)
      .utcOffset("+05:30")
      .add(6, "days")
      .endOf("day")
      .toDate();
  } else if (docs.planId === 503) {
    // end_date.setDate(end_date.getDate()+30)
    // const end_date = moment().utcOffset("+05:30").add(31,'days').endOf('day').toDate()
    end_date = moment(today_date)
      .utcOffset("+05:30")
      .add(29, "days")
      .endOf("day")
      .toDate();
  }

  var arr = getDatesInRange(new Date(today_date), new Date(end_date));

  function getDatesInRange(d1, d2) {
    const date = new Date(d1);
    const dates = [];
    while (date <= d2) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
  arr.map((item) => {
    const availableObject = {
      date: moment(item).utcOffset("+05:30").startOf("day").toDate(),
      breakfast: true,
      lunch: true,
      dinner: true,
    };
    docs.isavailable.push(availableObject);
  });

  console.log(end_date);
  docs.start_date = today_date;
  docs.end_date = end_date;
  docs.remaining_days = Math.round(
    moment.duration(moment(end_date).diff(moment(today_date))).asDays()
  );
  // console.log(docs.planId);
  next();
});

const UserPlan =
  mongoose.models.userplan || mongoose.model("userplan", userplanSchema);

export default UserPlan;
