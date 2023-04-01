import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Api/axios";
import useAuth from "../../Auth/useAuth";
import CurrentPlan from "./CurrentPlan";

const Subscription = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isCurrentPlan, setIsCurrentPlan] = useState(false);
  const { auth } = useAuth();
  const [plan_Id, setplan_Id] = useState(null);

  useEffect(() => {
    const getData = async (e) => {
      const userId = auth.userId;
      // if button enabled with JS hack
      try {
        const response = await axios.get(
          `/userplan/getusercurrentplan/${userId}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (response.data) {
          setCurrentPlan(response.data);
          setIsCurrentPlan(true);
        }
        // console.log(currentPlan);
        // alert(response.data.message);
      } catch (err) {
        alert(err);
      }
    };

    getData();
  }, [isCurrentPlan]);

  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get(`/plan/getAllPlan`, {
          withCredentials: true,
        });

        setPlans(response.data);
        // console.log(plans);
        // alert(response.data.message);
      } catch (err) {
        alert(err);
      }
    };

    getData();
  }, []);

  const takeSubscription = async (fees, planId) => {
    // e.preventDefault();
    const userId = auth.userId;
    console.log(userId);
    console.log(fees);
    console.log(planId);

    try {
      const response = await axios.post(
        "/userplan/addUserPlan",
        JSON.stringify({ userId, planId, fees }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));
      // setplan_Id(planId);
      // setIsCurrentPlan(true);
      navigate("/user", { replace: true });
      alert(response.data.message);
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else {
        alert("Registration Failed");
      }
    }
  };

  return (
    <div>
      {!isCurrentPlan ? (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 pt-3 pb-10 mx-auto">
            <div className="flex flex-col  text-center w-full mb-10">
              <h1 className="sm:text-5xl text-5xl font-medium title-font  mb-4 text-gray-900">
                Pricing
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-black mb-2">
                Select Your Plan and Enjoy the Food .
              </p>
              <p className="bg-blue-100 mx-28 border-t border-b border-blue-500  px-4 py-3">
                <span className="font-semibold text-xl text-black">Note :</span>{" "}
                <span className="text-red-500 text-lg">
                  {" "}
                  If You Select Any Plan then it Starts from Tomorrow
                </span>
              </p>
              {/* <div className="flex mx-auto border-2 border-red-500 rounded overflow-hidden mt-6">
                {plans.map((plan) => {
                  return plan.plan_type === "Monthly" ? (
                    <button className="py-1 px-4 hover:bg-red-600 hover:text-white border-r-2 border-red-500 focus:outline-none">
                      Monthly
                    </button>
                  ) : plan.plan_type === "Daily" ? (
                    <button className="py-1 px-4 hover:bg-red-600 hover:text-white border-r-2 border-red-500 focus:outline-none">
                      Daily
                    </button>
                  ) : (
                    <button className="py-1 px-4 hover:bg-red-600 hover:text-white focus:outline-none">
                      Weekly
                    </button>
                  );
                })}
              </div> */}
            </div>
            <div className="flex flex-wrap justify-around	">
              {plans.map((plan) => {
                return (
                  <div className="p-4 xl:w-1/4 md:w-1/2 min-w-[33%] min-h-[50vh]">
                    <div className="h-full p-6  border-2 rounded-2xl border-black bg-slate-200 flex flex-col relative overflow-hidden">
                      <span className="bg-[#32de84] text-black text-lg text-center w-[8rem] h-[2.5rem] px-3 py-1  tracking-widest  absolute right-0 top-0 rounded-bl">
                        {plan.plan_type}
                      </span>
                      <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
                        PRO
                      </h2>
                      <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-black">
                        <span>&#8377;{plan.plan_price}</span>
                        <span className="text-lg ml-1 font-normal text-gray-500"></span>
                      </h1>
                      <p className="flex items-center text-gray-600 mb-2 h-[8rem]">
                        {plan.plan_desc}
                      </p>
                      <button
                        className="flex items-center mt-auto hover:border-black  hover:border-2 text-black bg-gradient-to-r from-[#f953c6] to-[#b91d73] font-semibold  py-2 px-4 w-full focus:outline-none hover:bg-red-600 rounded"
                        onClick={() => {
                          if (window.confirm("Confirm the subcription "))
                            takeSubscription(plan.plan_price, plan.planId);
                        }}
                      >
                        Get Subscription
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4 ml-auto"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </button>
                      <p className="text-base text-center  text-red-400 mt-[1.4rem]">
                        Please Follow the Rule of Mess
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <CurrentPlan planDetail={currentPlan} plan_id={plan_Id} />
      )}
    </div>
  );
};

export default Subscription;
