import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import useAuth from "../../Auth/useAuth";
var isBetween = require("dayjs/plugin/isBetween");

const Attendance = () => {
  const { auth } = useAuth();
  dayjs.extend(isBetween);
  // variables

  // today date
  const [today, setToday] = useState({
    month: 3,
    year: 2023,
  });

  const [start, setStart] = useState({
    date: null,
    month: null,
    year: null,
  });
  const [end, setEnd] = useState({
    date: null,
    month: null,
    year: null,
  });

  const [entry, setEntry] = useState([]);

  // set start date and end date of this page
  var start_date_page = dayjs()
    .month(today.month - 1)
    .year(today.year)
    .startOf("month")
    .startOf("week")
    .format();
  var end_date_page = dayjs()
    .month(today.month - 1)
    .year(today.year)
    .endOf("month")
    .endOf("week")
    .format();

  // set start current plan and end current plan
  var start_date = dayjs()
    .date(start.date)
    .month(start.month)
    .year(start.year)
    .format();
  var end_date = dayjs()
    .date(end.date)
    .month(end.month)
    .year(end.year)
    .format();

  // console.log("starting page date ", start_date_page);
  // console.log("ending page date ", end_date_page);

  // get array of dates of this page
  var arr = getDatesInRange(new Date(start_date_page), new Date(end_date_page));

  function getDatesInRange(d1, d2) {
    const date = new Date(d1);
    const dates = [];
    while (date <= d2) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

  // fetching data
  useEffect(() => {
    const getData = async (e) => {
      try {
        const userId = auth.userId;
        // const userId = 2007;
        const response = await axios.get(`/dailyentry/getuserentry/${userId}`, {
          withCredentials: true,
        });

        // console.log("Entry ", response.data.attendance);
        setEntry(response.data.attendance);
      } catch (err) {
        console.log(err);
      }
    };

    // console.log("Fetching user entry data");
    getData();
  }, []);

  useEffect(() => {
    const getCurrentPlan = async () => {
      const userId = auth.userId;
      // const userId = 2007;

      try {
        const planResponse = await axios.get(
          `/userplan/getusercurrentplan/${userId}`,
          {
            withCredentials: true,
          }
        );
        // console.log("Curr Plan ",dayjs(planResponse.data.start_date).get("date"));
        const curr_start = dayjs(planResponse.data.start_date);
        const curr_end = dayjs(planResponse.data.end_date);
        console.log("Curr Plan ", planResponse.data);
        setStart({
          date: curr_start.get("date"),
          month: curr_start.get("month"),
          year: curr_start.get("year"),
        });

        setEnd({
          date: curr_end.get("date"),
          month: curr_end.get("month"),
          year: curr_end.get("year"),
        });
      } catch (error) {}
    };
    // console.log("Fetching current plan data");
    getCurrentPlan();
  }, []);

  var bg_big = "bg-gray-100";
  var bg = "bg-red-500";

  // create this page content
  const content = arr.map((item, index) => {
    // check is date is current plan

    var from = dayjs()
      .year(start.year)
      .month(start.month)
      .date(start.date)
      .format();
    var to = dayjs()
      .year(end.year)
      .month(end.month)
      .date(end.date)
      .endOf("day")
      .format();

    var check = dayjs()
      .year(item.getFullYear())
      .month(item.getMonth())
      .date(item.getDate())
      .format();

    if (check >= from && check <= to) {
      bg_big = "bg-purple-400";
    } else {
      bg_big = "bg-gray-500";
    }

    // console.log(check >= from && check <= to);
    // console.log("Entry ", entry);
    var breakfast = false;
    var lunch = false;
    var dinner = false;
    for (let index = 0; index < entry.length; index++) {
      var entrydate = new Date(entry[index].date);
      entrydate = dayjs()
        .year(entrydate.getFullYear())
        .month(entrydate.getMonth())
        .date(entrydate.getDate())
        .format();

      if (entrydate === check) {
        if (entry[index].menu.breakfast) {
          breakfast = true;
        }
        if (entry[index].menu.lunch) {
          lunch = true;
        }
        if (entry[index].menu.dinner) {
          dinner = true;
        }
        break;
      }
    }

    return item.getMonth() !== today.month - 1 ? (
      <div className={` cursor-pointer flex w-full justify-center`}>
        <div
          className={`${bg_big} rounded w-[50px] h-[50px] flex flex-col gap-2 items-center justify-center`}
        >
          <p
            className={`text-base text-gray-600 dark:text-gray-100 "bg-green-500 rounded-circle flex items-center justify-center w-[30px] h-[30px]"
            `}
          >
            {item.getDate()}
          </p>
          <span className="flex gap-1">
            {breakfast ? (
              <div className="w-1 h-1 bg-green-200 rounded-full"></div>
            ) : (
              ""
            )}
            {lunch ? (
              <div className="w-1 h-1 bg-[orange] rounded-full"></div>
            ) : (
              ""
            )}
            {dinner ? (
              <div className="w-1 h-1 bg-[red] rounded-full"></div>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    ) : (
      <div className={`px-2 py-2 cursor-pointer  flex w-full justify-center `}>
        <div
          className={`${bg_big} rounded w-[50px] h-[50px] flex flex-col gap-2 items-center justify-center`}
        >
          <p
            className={`text-base text-gray-600 dark:text-gray-100 "bg-green-500 rounded-circle flex items-center justify-center w-[30px] h-[30px]"
            `}
          >
            {item.getDate()}
          </p>
          <span className="flex gap-1">
            {breakfast ? (
              <div className="w-3 h-1 bg-green-400 rounded-full"></div>
            ) : (
              ""
            )}
            {lunch ? (
              <div className="w-3 h-1 bg-orange-200 rounded-full"></div>
            ) : (
              ""
            )}
            {dinner ? (
              <div className="w-3 h-1 bg-purple-300 rounded-full"></div>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    );
  });

  // increament and decreament
  const incrementmonth = () => {
    if (today.month === 12) {
      setToday({
        month: 1,
        year: today.year + 1,
      });
    } else {
      setToday({
        month: today.month + 1,
        year: today.year,
      });
    }
    // const currentyearandmonth = dayjs().month(monthyear.month).year(monthyear.year).add(2,'month')
    // console.log(currentyearandmonth);
  };

  const decrement = () => {
    if (today.month === 1) {
      setToday({
        month: 12,
        year: today.year - 1,
      });
    } else {
      setToday({
        month: today.month - 1,
        year: today.year,
      });
    }
  };

  return (
    <div className="flex items-center justify-self-stretch py-8 px-4 ">
      <div className=" min-h-[75vh] min-w-[75%] w-full shadow-lg  ">
        <div className="py-12 px-5 flex flex-col dark:bg-gray-800  rounded-t min-h-[75vh] bg-amber-100">
          <div className="px-4 flex items-center justify-between flex-[2]">
            <span
              tabIndex={0}
              className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
            >
              {today.month} - {today.year}
            </span>
            <div className="flex items-center">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() =>
                  setToday({
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
  );
};

export default Attendance;
