import React, { useState, useEffect } from "react";
import axios from "../../Api/axios.js";
import dayjs from "dayjs";
import useAuth from "../../Auth/useAuth.js";
const Attendent = () => {
  // user entry store here for everyday
  const [userEntry, setUserEntry] = useState([]);

  // starting day of student
  const [monthyear, setmonthyear] = useState({
    month: 3,
    year: 2023,
  });

  const [currStMonthDate, setcurrStMonthDate] = useState({
    date: 0,
    month: 0,
    year: 0,
  });
  const [currEnMonthDate, setcurrEnMonthDate] = useState({
    date: 0,
    month: 0,
    year: 0,
  });

  const { auth } = useAuth();

  // fetching data
  useEffect(() => {
    const getData = async (e) => {
      try {
        const userId = auth.userId;
        // const userId = 2007;
        const response = await axios.get(`/dailyentry/getuserentry/${userId}`, {
          withCredentials: true,
        });

        const currpId =
          response.data.attendance[response.data.attendance.length - 1]
            .currPlanId;
        console.log(currpId);

        const planResponse = await axios.get(
          `/userplan//getusercurrentplan/${userId}`,
          {
            withCredentials: true,
          }
        );

        const curr_start = new Date(planResponse.data.start_date);
        const curr_end = new Date(planResponse.data.end_date);

        console.log(curr_start, curr_end);
        const start = new Date(response.data.attendance[1].date);
        const end =
          response.data.attendance[response.data.attendance.length - 1].date;

        setmonthyear({
          month: start.getMonth() + 1,
          year: start.getFullYear(),
        });
        setUserEntry(response.data.attendance);
        setcurrStMonthDate({
          date: curr_start.getDate(),
          month: curr_start.getMonth(),
          year: curr_start.getFullYear(),
        });
        setcurrEnMonthDate({
          date: curr_end.getDate(),
          month: curr_end.getMonth(),
          year: curr_end.getFullYear(),
        });
        console.log("Get All User", currEnMonthDate.date);
        console.log("Get All User", currEnMonthDate.month);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
    console.log("This is data fetch");
  }, [starting_date]);

  var starting_date = new Date(
    dayjs()
      .month(monthyear.month - 1)
      .year(monthyear.year)
      .startOf("month")
      .startOf("week")
      .format("YYYY-MM-DD")
  );
  var endind_date = new Date(
    dayjs()
      .month(monthyear.month - 1)
      .year(monthyear.year)
      .endOf("Month")
      .endOf("week")
      .format("YYYY-MM-DD")
  );

  var arr = getDatesInRange(starting_date, endind_date);

  function getDatesInRange(d1, d2) {
    const date = new Date(d1);
    // console.log("date" + date);
    // console.log(d2);
    const dates = [];
    while (date <= d2) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  const incrementmonth = () => {
    if (monthyear.month === 12) {
      setmonthyear({
        month: 1,
        year: monthyear.year + 1,
      });
    } else {
      setmonthyear({
        month: monthyear.month + 1,
        year: monthyear.year,
      });
    }
    // const currentyearandmonth = dayjs().month(monthyear.month).year(monthyear.year).add(2,'month')
    // console.log(currentyearandmonth);
  };

  const decrement = () => {
    if (monthyear.month === 1) {
      setmonthyear({
        month: 12,
        year: monthyear.year - 1,
      });
    } else {
      setmonthyear({
        month: monthyear.month - 1,
        year: monthyear.year,
      });
    }
  };

  var bg = false;
  var bg_big = "bg-white";

  const content = arr.map((item, index) => {
    for (let index = 1; index < userEntry.length; index++) {
      const element = userEntry[index];
      const checkdate = new Date(element.date);

      if (
        item.getDate() == checkdate.getDate() &&
        item.getMonth() == checkdate.getMonth()
      ) {
        if (element.currPlanId == 501) {
          bg_big = "bg-red";
        }
        if (element.currPlanId == 502) {
          bg_big = "bg-red-100";
        }
        if (element.currPlanId == 503) {
          bg_big = "bg-purple-200";
        }
        bg = true;
        break;
      } else {
        bg_big = "bg-gray-600";
        bg = false;
      }
    }

    var from = new Date(
      currStMonthDate.year,
      currStMonthDate.month - 1,
      currStMonthDate.date
    );
    var to = new Date(
      currEnMonthDate.year,
      currEnMonthDate.month - 1,
      currEnMonthDate.date
    );
    var check = new Date(
      item.getFullYear(),
      item.getMonth() - 1,
      item.getDate()
    );

    // console.log(check > from && check < to);

    if (check > from && check < to) {
      bg_big = "bg-yellow-400";
    }

    // console.log(bg);
    return item.getMonth() !== monthyear.month - 1 ? (
      <div className={` cursor-pointer flex w-full justify-center`}>
        <div
          className={`${bg_big} rounded w-[50px] h-[50px] flex items-center justify-center`}
        >
          <p
            className={`text-base text-gray-600 dark:text-gray-100 ${
              bg
                ? "bg-green-500 rounded-circle flex items-center justify-center w-[30px] h-[30px]"
                : "bg-red-800 rounded-circle flex items-center justify-center w-[30px] h-[30px]"
            }`}
          >
            {item.getDate()}
          </p>
        </div>
      </div>
    ) : (
      <div className={`px-2 py-2 cursor-pointer  flex w-full justify-center `}>
        <div
          className={`${bg_big} rounded w-[50px] h-[50px] flex items-center justify-center`}
        >
          <p
            className={`text-base p-[0.4rem] text-gray-600 dark:text-gray-100 ${
              bg
                ? "bg-green-500 rounded-circle flex items-center justify-center w-[30px] h-[30px]"
                : "bg-red-800 rounded-circle flex items-center justify-center w-[30px] h-[30px]"
            }`}
          >
            {item.getDate()}
          </p>
        </div>
      </div>
    );
  });
  // console.log(content);

  return (
    <>
      {/* component */}
      <div className="flex items-center justify-self-stretch py-8 px-4 ">
        {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
        <div className=" min-h-[75vh] min-w-[75%] w-full shadow-lg  ">
          <div className="py-12 px-5 flex flex-col dark:bg-gray-800  rounded-t min-h-[75vh] bg-amber-100">
            {/* ---------------------------------------------------------------------------------------------- */
            /*                                        uper part header                                        */
            /* ---------------------------------------------------------------------------------------------- */}

            <div className="px-4 flex items-center justify-between flex-[2]">
              <span
                tabIndex={0}
                className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
              >
                {monthyear.month} - {monthyear.year}
              </span>
              <div className="flex items-center">
                {/* ---------------------------------------------------------------------------------------------- */
                /*                                        Left side button                                        */
                /* ---------------------------------------------------------------------------------------------- */}
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() =>
                    setmonthyear({
                      month: dayjs().month() + 1,
                      year: dayjs().year(),
                    })
                  }
                >
                  current
                </button>
                <button
                  aria-label="calendar backward"
                  className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
                  onClick={() => decrement()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </button>

                {/* ---------------------------------------------------------------------------------------------- */
                /*                                        Right side button                                        */
                /* ---------------------------------------------------------------------------------------------- */}
                <button
                  aria-label="calendar forward"
                  className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
                  onClick={() => incrementmonth()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler  icon-tabler-chevron-right"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ---------------------------------------------------------------------------------------------- */
            /*                                           bottom part                                          */
            /* ---------------------------------------------------------------------------------------------- */}
            <div className="grid items-center grid-cols-7	 justify-between pt-12 overflow-x-auto flex-[8] ">
              <div className="w-full flex justify-center">
                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                  Su
                </p>
              </div>
              <div className="w-full flex justify-center">
                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                  mo
                </p>
              </div>
              <div className="w-full flex justify-center">
                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                  tu
                </p>
              </div>
              <div className="w-full flex justify-center">
                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                  wed
                </p>
              </div>
              <div className="w-full flex justify-center">
                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                  thu
                </p>
              </div>
              <div className="w-full flex justify-center">
                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                  Fri
                </p>
              </div>
              <div className="w-full flex justify-center">
                <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                  Sat
                </p>
              </div>

              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendent;
