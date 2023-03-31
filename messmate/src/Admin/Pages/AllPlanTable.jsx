import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "../../Api/axios";

const AllPlanTable = () => {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const row = 5;
  const totalpages = Math.ceil(users.length / row);
  const [startingindex, setstartingindex] = useState(0);

  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get("/userplan/getUserPlan", {
          withCredentials: true,
        });

        // console.log("Get All User", response.data);
        setUsers(response.data);
        console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [alert]);

  const handlePayment = async (userId, planId) => {
    try {
      console.log(userId, planId);
      const response = await axios.patch(
        `userplan/updateUserPlan`,
        JSON.stringify({ userId, planId }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("See daily entry");
      console.log(response.data);
      setAlert(true);
    } catch (error) {
      if (!error?.response) {
        console.log("No Server Response");
      } else {
        console.log("Deletion Failed");
      }
    }
  };

  const content = users
    .filter((item, i) => {
      return item.userId.toString().includes(search) ||
        item.planId.toString().includes(search) ||
        item.fee_status
        ? "paid".includes(search)
        : "none".includes(search);
    })
    .slice(startingindex, startingindex + row)
    .map((user) => {
      return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="w-4 p-4">
            <div className="flex items-center text-black">{user.userId}</div>
          </td>
          <td className="text-black px-6 py-4">
            <div className="flex items-center text-black">{user.planId}</div>
          </td>
          <td className="text-black px-6 py-4">
            <div className="flex items-center text-black">
              {dayjs(user.start_date).get("date") +
                "-" +
                (dayjs(user.start_date).get("month") + 1) +
                "-" +
                dayjs(user.start_date).get("year")}
            </div>
          </td>
          <td className="text-black px-6 py-4">
            <div className="flex items-center text-black">
              {" "}
              {dayjs(user.end_date).get("date") +
                "-" +
                (dayjs(user.end_date).get("month") + 1) +
                "-" +
                dayjs(user.end_date).get("year")}
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center text-black">
              {user.fee_status ? (
                <div className="w-[2rem] h-[2rem] border rounded-full bg-green-700"></div>
              ) : (
                <div className="w-[2rem] h-[2rem] border rounded-full bg-red-700"></div>
              )}
            </div>
          </td>

          <td className="px-6 py-4">
            {/* <button>Edit </button> */}
            {!user.fee_status ? (
              <button
                type="button"
                class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2 "
                onClick={() =>{if(window.confirm("Confirm the User Paid Fees  ")) handlePayment(user.userId, user.planId)}}
              >
                Pay
              </button>
            ) : (
              <button
                type="button"
                class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-3 py-[0.5rem] text-center mr-2 mb-2 "
              >
                Paid
              </button>
            )}
          </td>
        </tr>
      );
    });

  const pagesArray = Array(totalpages)
    .fill()
    .map((index, i) => {
      return (
        <button
          className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
          onClick={() => {
            setPage(i);
            setstartingindex(i * row);
          }}
        >
          {i}
        </button>
      );
    });
  return (
    <div>
      <div className="flex items-center justify-end  pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-2 right-0 px-1  flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-dark dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              UserId
            </th>
            <th scope="col" className="px-6 py-3">
              PlanID
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Fee Status
            </th>
            <th scope="col" className="px-6 py-3">
              Fee Pay
            </th>
          </tr>
        </thead>

        <tbody>{content}</tbody>
      </table>
      <div className="flex mt-2 mb-2 ">
        <nav
          className="isolate m-auto min-h-[40px]  inline-flex mb-5 flex-space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={() => setPage(page - 1)}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {pagesArray}

          <button
            onClick={() => setPage(page + 1)}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AllPlanTable;
