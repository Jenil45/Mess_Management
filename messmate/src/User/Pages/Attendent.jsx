import React, { useState } from "react";
import dayjs from 'dayjs';
const Attendent = () => {
  const [ monthyear, setmonthyear ] = useState({
    'month': dayjs().month() + 1,
    'year': dayjs().year()
  });


  var starting_date = new Date(dayjs().month(monthyear.month - 1).year(monthyear.year).startOf('month').startOf('week').format('YYYY-MM-DD'));
  var endind_date = new Date(dayjs().month(monthyear.month - 1).year(monthyear.year).endOf('Month').endOf('week').format('YYYY-MM-DD'));

  var arr = getDatesInRange(starting_date, endind_date);
  console.log("Hello");
  console.log(starting_date);
  console.log(endind_date);
  console.log(arr);


  function getDatesInRange(d1, d2) {
    const date = new Date(d1);
    console.log("date" + date);
    console.log(d2);
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
        'month': 1,
        'year': monthyear.year + 1
      })
    }
    else {
      setmonthyear({
        'month': monthyear.month + 1,
        'year': monthyear.year
      })
    }
    // const currentyearandmonth = dayjs().month(monthyear.month).year(monthyear.year).add(2,'month')
    // console.log(currentyearandmonth);
  }


  const decrement = () => {
    if (monthyear.month === 1) {
      setmonthyear({
        'month': 12,
        'year': monthyear.year - 1
      })
    }
    else {
      setmonthyear({
        'month': monthyear.month - 1,
        'year': monthyear.year
      })
    }
  }

  const content = arr.map((item, index) => (item.getMonth() !== (monthyear.month - 1)) ?
    (<div className="px-2 py-2 cursor-pointer flex w-full justify-center">
      <p className="text-base text-gray-600 dark:text-gray-100">
        {item.getDate()}
      </p>
    </div>)
    :

    (
      <div className="px-2 py-2 cursor-pointer  flex w-full justify-center">
        <p className="text-base text-black font-weight-bold dark:text-gray-100">
          {item.getDate()}
        </p>
      </div>
    )

  )
  console.log(content);


  return (<>
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
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={()=> setmonthyear({
                'month':dayjs().month() +1,
                'year':dayjs().year()
              })}>
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
