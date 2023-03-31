import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import useAuth from "../../Auth/useAuth";

const CurrentPlan = ({ planDetail, plan_id }) => {
  const [plan, setPlan] = useState("");
  const { auth } = useAuth();

  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        var plan_type = "Weekly";
        if (plan_id == 501) {
          plan_type = "Daily";
        }
        if (plan_id == 502) {
          plan_type = "Weekly";
        }
        if (plan_id == 503) {
          plan_type = "Monthly";
        }

        const response = await axios.get(`/plan/getPlan/${plan_type}`, {
          withCredentials: true,
        });

        // console.log(response.data.plan[0]);
        setPlan(response.data.plan[0]);
        console.log("plan", plan);
        // alert(response.data.message);
      } catch (err) {
        alert(err);
      }
    };

    getData();
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
    <h1 className="text-center font-semibold text-4xl text-black"> Your Current Plan </h1>
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex justify-center flex-wrap">
          <div className="lg:w-1/2 w-full p-4 bg-gray-200 rounded-lg lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm font-semibold pl-2 title-font text-red-600  tracking-widest">
              {planDetail.planId}
            </h2>
            <h1 className="text-blue-800  text-4xl title-font font-medium mb-2">
              {planDetail.planId === 501
                ? "Daily"
                : planDetail.planId === 502
                ? "Weekly"
                : "Monthly"}{" "}
              Plan
            </h1>
            <div className="flex mb-4">
              <span className="flex-grow text-black font-semibold border-b-2 border-red-400 py-2 text-lg px-1">
                Plan Detail
              </span>
            </div>
            {/* <p className="leading-relaxed mb-4">
              {plans.map((plan) => {
                return <span>{plan.plan_desc}</span>;
              })}
            </p> */}
            <p className="">{plan.plan_desc}</p>
            <div className="flex border-b mt-3 bottom-2 border-black py-2">
              <span className="text-gray-500">Starting Date</span>
              <span className="ml-auto text-gray-900">
                {/* {planDetail.start_date} */}
                {dayjs(planDetail.start_date).get("date") +
                  "-" +
                  (dayjs(planDetail.start_date).get("month") + 1) +
                  "-" +
                  dayjs(planDetail.start_date).get("year")}
              </span>
            </div>
            <div className="flex border-b bottom-2 border-black py-2">
              <span className="text-gray-500">Ending Date</span>
              <span className="ml-auto text-gray-900">
                {/* {planDetail.end_date} */}
                {dayjs(planDetail.end_date).get("date") +
                  "-" +
                  (dayjs(planDetail.end_date).get("month") + 1) +
                  "-" +
                  dayjs(planDetail.end_date).get("year")}
              </span>
            </div>
            <div className="flex border-b bottom-2 border-black mb-6  py-2">
              <span className="text-gray-500">Remaining Days</span>
              <span className="ml-[60%] bg-lime-300 min-w-[30px] text-center rounded-md   text-gray-900">
                {dayjs(planDetail.end_date).diff(dayjs(), "day")}
              </span>
            </div>
            <div className="flex mt-5 ">
              <span className="title-font font-medium text-2xl pl-4 text-gray-900">
                &#8377;{planDetail.fees}
              </span>
              <button className="flex ml-auto  text-black bg-blue-400 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
              onClick = "">
                Feedback
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ">
                {/* <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg> */}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CurrentPlan;
