import React, { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";
import axios from "../../Api/axios";
// import QRCode from "qrcode";
// import QrReader from "react-qr-reader";

const QrAttendance = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState(null);
  const [isCard, setIsCard] = useState(false);

  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(JSON.parse(result));
      setIsCard(true);
      // const userId = scanResultWebCam.userId;
      console.log(scanResultWebCam.userId);
      // console.log(JSON.stringify(scanResultWebCam));
      try {
      } catch (error) {}
    }
  };

  const takeAttendance = async (userId, planId) => {
    try {
      console.log("Inside breakfast");
      const verifyThing = type;
      console.log(verifyThing, userId, planId);
      const response = await axios.patch(
        `dailyentry/updateentry`,
        JSON.stringify({ userId, verifyThing, planId }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("See daily entry");
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      if (!error?.response) {
        console.log("No Server Response");
      } else {
        console.log("Deletion Failed");
      }
    }
  };

  return (
    <div className="flex">
      <div className="flex-[1] flex flex-col  items-center justify-center h-[40rem]">
        <div className="dayselect flex flex-col">
          <select
            id="day"
            name="menu_day"
            class="bg-gray-50 w-[20rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {}
            <option selected>Select type</option>
            <option value="breakfast">BreakFast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>
        {isCard ? (
          <div className="lg:w-4/5 mx-auto flex flex-wrap W-[20rem]  p-[2rem]">
            {scanResultWebCam.isToday ? (
              <div className=" lg:pr-10 lg:py-6 mb-6 lg:mb-0  w-[28rem] p-[1rem] border border-[1px] border-black border">
                <div className="flex mb-4">
                  <span className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                    {scanResultWebCam.name}
                  </span>
                </div>
                {/* <p className="leading-relaxed mb-4">
              {plans.map((plan) => {
                return <span>{plan.plan_desc}</span>;
              })}
            </p> */}
                <p>{scanResultWebCam.userId}</p>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500 flex-[1]">Email </span>
                  <span className="flex-[1] text-gray-900">
                    {scanResultWebCam.email}
                  </span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500 flex-[1]">
                    Current Plan Id
                  </span>
                  <span className=" text-gray-900 flex-[1]">
                    {scanResultWebCam.planId}
                  </span>
                </div>
                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span className="text-gray-500 flex-[1]">Fee Status</span>
                  <span className=" text-gray-900 flex-[1]">
                    {scanResultWebCam.fee_status ? (
                      <div className="w-[2rem] h-[2rem] rounded-full bg-green-400"></div>
                    ) : (
                      <div className="w-[2rem] h-[2rem] rounded-full bg-red-400"></div>
                    )}
                  </span>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    &#8377;{scanResultWebCam.fee}
                  </span>
                  <button
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    onClick={() =>
                      takeAttendance(
                        scanResultWebCam.userId,
                        scanResultWebCam.planId
                      )
                    }
                  >
                    Button
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              "You have no plan for today"
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex-[1] ">
        <h3>Qr Code Scan by Web Cam</h3>
        <QrReader
          delay={300}
          style={{ width: "100%" }}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
          // legacyMode
        />
        {/* <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
      </div>
    </div>
  );
};

export default QrAttendance;
