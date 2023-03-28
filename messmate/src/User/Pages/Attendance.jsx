import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import useAuth from "../../Auth/useAuth";

const Attendance = () => {
  const { auth } = useAuth();

  // variables

  // today date
  const [today, setToday] = useState({
    month: 3,
    year: 2023,
  });

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

        console.log("Entry ", response.data);
      } catch (err) {
        console.log(err);
      }
    };

    console.log("Fetching user entry data");
    getData();
  }, []);

  useEffect(() => {
    const getCurrentPlan = async () => {
      const userId = auth.userId;
      // const userId = 2007;

      try {
        const planResponse = await axios.get(
          `/userplan//getusercurrentplan/${userId}`,
          {
            withCredentials: true,
          }
        );
        console.log("Curr Plan ", planResponse.data.start_date);
        console.log("Curr Plan ", planResponse.data.end_date);
      } catch (error) {}
    };
    console.log("Fetching current plan data");
    getCurrentPlan();
  }, []);

  var bg_big = "bg-yellow-500";
  var bg = "bg-red-500";

  // create this page content
  const content = arr.map((item, index) => {
    return item.getMonth() !== today.month - 1 ? (
      <div className={` cursor-pointer flex w-full justify-center`}>
        <div
          className={`rounded w-[50px] h-[50px] flex items-center justify-center`}
        >
          <p
            className={`text-base text-gray-600 dark:text-gray-100 "bg-green-500 rounded-circle flex items-center justify-center w-[30px] h-[30px]"
            `}
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

  return (
    <div className="flex items-center justify-self-stretch py-8 px-4 ">
      <div className=" min-h-[75vh] min-w-[75%] w-full shadow-lg  ">
        <div className="py-12 px-5 flex flex-col dark:bg-gray-800  rounded-t min-h-[75vh] bg-amber-100">
          <div className="px-4 flex items-center justify-between flex-[2]">
            <span
              tabIndex={0}
              className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
            >
              {/* {monthyear.month} - {monthyear.year} */}
            </span>
            <div className="flex items-center">
              {/* <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() =>
                setmonthyear({
                  month: dayjs().month() + 1,
                  year: dayjs().year(),
                })
              }
            >
              current
            </button> */}
              {/* <button
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
            </button> */}
              {/* <button
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
            </button> */}
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
