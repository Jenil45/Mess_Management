import React, { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";
import axios from "../../Api/axios";
import Alert from "../../Components/Alert";
import Card from "./Card";
// import QRCode from "qrcode";
// import QrReader from "react-qr-reader";

const QrAttendance = () => {
  const [data, setData] = useState([]);
  const [possible, setPossible] = useState(false);
  const [possible1, setPossible1] = useState(false);
  const [possible2, setPossible2] = useState(false);
  const [type, setType] = useState(null);
  const [isCard, setIsCard] = useState(false);
  const [alert, setalert] = useState({
    mode: false,
    message: "",
    type: "bg-[red]",
  });

  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    setTimeout(() => {
      if (result) {
        var result1 = JSON.parse(result);
        if (type === "breakfast" && result1.isTodayBreakfast) {
          console.log(type === "breakfast" && result1.isTodayBreakfast);
          setPossible(true);
        } else {
          setPossible(false);
        }
        if (type === "lunch" && result1.isTodayLunch) {
          setPossible1(true);
        } else {
          setPossible1(false);
        }
        if (type === "dinner" && result1.isTodayDinner) {
          setPossible2(true);
        } else {
          setPossible2(false);
        }
        setScanResultWebCam(result1);
        setIsCard(true);
        // const userId = scanResultWebCam.userId;
        console.log(scanResultWebCam.userId);
        // console.log(JSON.stringify(scanResultWebCam));
        try {
        } catch (error) {}
      }
    }, 5);
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
      // alert(response.data.message);
      setalert({
        mode: true,
        message: response.data.message,
        type: "bg-[green]",
      });
    } catch (error) {
      if (!error?.response) {
        console.log("No Server Response");
      }
      // else if(error.response?.status === 400)
      // {

      // }
      else {
        // console.log("Deletion Failed");
        console.log(error.message);
        console.log(error.response.data.message);
        const message = error.response.data.message;
        setalert({
          mode: true,
          message: message,
          type: "bg-[red]",
        });
      }
    }
  };

  return (
    <div>
      {alert.mode ? <Alert alert={alert} setalert={setalert} /> : ""}

      <div className="flex items-center justify-center">
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
              {scanResultWebCam.isTodayBreakfast && possible ? (
                <Card
                  scanResultWebCam={scanResultWebCam}
                  takeAttendance={takeAttendance}
                  info={"Breakfast"}
                />
              ) : scanResultWebCam.isTodayLunch && possible1 ? (
                <Card
                  scanResultWebCam={scanResultWebCam}
                  takeAttendance={takeAttendance}
                  info={"Lunch"}
                />
              ) : scanResultWebCam.isTodayDinner && possible2 ? (
                <Card
                  scanResultWebCam={scanResultWebCam}
                  takeAttendance={takeAttendance}
                  info={"Dinner"}
                />
              ) : (
                "You have no plan for today"
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex-[1] w-[500px]">
          <h3 className="h2">Qr Code Scan by Web Cam</h3>

          <QrReader
            delay={300}
            style={{ width: "400px", heigth: "400px" }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
            // onScan={(() => setTimeout(() => handleScanWebCam()), 500)}
            cameraContainerStyle={{
              width: 275,
              borderWidth: 1,
              borderColor: "white",
              alignSelf: "center",
            }}
            cameraStyle={{ width: "97%", alignSelf: "center" }}
            // legacyMode
          />
          {/* <h3>Scanned By WebCam Code: {scanResultWebCam}</h3> */}
        </div>
      </div>
    </div>
  );
};

export default QrAttendance;
