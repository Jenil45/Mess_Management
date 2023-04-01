import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { axiosPrivate } from "../../Api/axios";
import Alert from "../../Components/Alert";
import closeBtnpic from "../../Svg/close.svg";
import dayjs from "dayjs";

function ConsentModal(props) {
  // const { setAuth } = useAuth();
  const [alert, setalert] = useState({
    mode: false,
    message: "",
    type: "bg-[red]",
  });

  const [breakfast, setBreakfast] = useState(false);
  const [lunch, setLunch] = useState();
  const [dinner, setDinner] = useState();

  const [data, setData] = useState(true);
  const [date, setDate] = useState(null);

  // validation in all fields

  useEffect(() => {
    const getData = async (consentDate) => {
      // if button enabled with JS hack
      console.log(props.userId);
      console.log(props.planId);
      console.log(props.consentDate);
      const obj = JSON.stringify({
        userId: props.userId,
        planId: props.planId,
        date: props.consentDate,
      });
      // console.log(props);
      //   console.log("Inside effect", userEmail);
      try {
        const response = await axiosPrivate.get(`/userplan/getConsent/${obj}`);

        console.log(response);
        setData(response.data);
        setBreakfast(response.data.isavailable[0].breakfast);
        // console.log(response.data.isavailable[0].breakfast);
        setLunch(response.data.isavailable[0].lunch);
        setDate(response.data.isavailable[0].date);
        setDinner(response.data.isavailable[0].dinner);
      } catch (err) {
        console.log(err);
      }
    };

    getData(props.consentDate);
  }, []);

  const updateConsent = async () => {
    try {
      console.log("inside update");
      console.log(date);
      const response = await axios.patch(
        "/userplan/updateConsent",
        JSON.stringify({
          userId: props.userId,
          planId: props.planId,
          date: dayjs(date).toDate(),
          breakfast,
          lunch,
          dinner,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      // setSuccess(true);

      //clear state and controlled inputs
      console.log(response);
      //   props.setEditmodal(false);
    } catch (err) {
      setalert({
        mode: true,
        message: err.message,
        type: "bg-[red]",
      });
    }
  };

  // handling submit
  return (
    <div
      className="relative z-10 bg-red-500"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={() => props.setEditmodal(false)}
      />

      <div className="flex fixed left-[35%] min-w-[30%] max-w-[35%] h-[30rem]   transform overflow-hidden  p-7  bg-gray-100 rounded-lg gap-[2rem]  flex-col  items-center justify-start  md:mt-0 ">
        <div className="flex items-center flex-row  justify-between">
          <div>
            <h2 className=" flex-[9] h-14 pt-3 text-gray-900 text-3xl text-center font-medium title-font mb-2">
              Give Consent
            </h2>
          </div>
          <div class="flex-[1] pl-10">
            <img
              src={closeBtnpic}
              alt=""
              className=" cursor-pointer min-h-[35px] min-w-[35px] mt-1"
              onClick={() => props.setEditmodal(false)}
            />
          </div>
        </div>
        <form className="flex flex-col gap-[1rem]">
          <div className="relative flex gap-1 items-center justify-center ">
            <h1 className="h5">Breakfast</h1>
            <input
              type="checkbox"
              id="full-name"
              name="name"
              checked={breakfast}
              onChange={(e) => setBreakfast(!breakfast)}
              className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative flex gap-1 items-center justify-center ">
            <h1 className="h5">Lunch</h1>
            <input
              type="checkbox"
              id="full-name"
              name="name"
              checked={lunch}
              onChange={() => setLunch(!lunch)}
              //   value={lunch}
              className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative flex gap-1 items-center justify-center ">
            <h1 className="h5">Dinner</h1>
            <input
              type="checkbox"
              id="full-name"
              name="name"
              checked={dinner}
              onChange={(e) => setDinner(!dinner)}
              value={dinner}
              className=" bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button
            onClick={updateConsent}
            className="text-white bg-indigo-600 border-0 py-2 px-3 mx-auto focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Give Consent
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConsentModal;
