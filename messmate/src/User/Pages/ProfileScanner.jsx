import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import useAuth from "../../Auth/useAuth";
import axios from "../../Api/axios";

const ProfileScanner = () => {
  const [text, setText] = useState("This is amazing");
  const [plan, setPlan] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { auth } = useAuth();

  useEffect(() => {
    const getCurrentPlan = async () => {
      const userId = auth.userId;

      try {
        const planResponse = await axios.get(
          `/userplan/getusertodayplan/${userId}`,
          {
            withCredentials: true,
          }
        );

        console.log(planResponse.data[0].isavailable[0].dinner);
        const isTodayBreakfast = planResponse.data[0].isavailable[0].breakfast;
        const isTodayLunch = planResponse.data[0].isavailable[0].lunch;
        const isTodayDinner = planResponse.data[0].isavailable[0].dinner;
        var planDataObject;
        if (planResponse.data.length !== 0) {
          planDataObject = {
            planId: planResponse.data[0].planId,
            fee: planResponse.data[0].fees,
            fee_status: planResponse.data[0].fee_status,
            isTodayBreakfast: isTodayBreakfast,
            isTodayLunch: isTodayLunch,
            isTodayDinner: isTodayDinner,
          };
        } else {
          planDataObject = {
            planId: "You have no plan for today",
            fee: "",
            fee_status: "",
            isTodayBreakfast: "",
            isTodayLunch: "",
            isTodayDinner: "",
          };
          console.log(planDataObject);
        }

        setPlan(planDataObject);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentPlan();
  }, []);

  useEffect(() => {
    const generateQrCode = async () => {
      const dataObject = JSON.stringify({
        userId: auth.userId,
        name: auth.name,
        email: auth.email,
        planId: plan.planId,
        fee: plan.fee,
        fee_status: plan.fee_status,
        isTodayBreakfast: plan.isTodayBreakfast,
        isTodayLunch: plan.isTodayLunch,
        isTodayDinner: plan.isTodayDinner,
      });
      //   console.log(auth);
      console.log(dataObject);

      try {
        const response = await QRCode.toDataURL(dataObject);
        setImageUrl(response);
      } catch (error) {
        console.log(error);
      }
    };

    generateQrCode();
  });

  return (
    <div className="profilescanner m-auto flex items-center justify-center  h-[40rem]">
      <div className="scanner flex-[1]  h-[30rem] flex items-center justify-center">
        {imageUrl ? (
          <a href={imageUrl} download>
            <img src={imageUrl} alt="img" className="w-[20rem]" />
          </a>
        ) : <h1 className="text-black text-center text-4xl font-semibold "> Please take the  Subcription Plan ....  </h1>}
      </div>
    </div>
  );
};

export default ProfileScanner;
