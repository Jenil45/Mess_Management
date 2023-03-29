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

        console.log(planResponse);
        var planDataObject;
        if (planResponse.data.length !== 0) {
          planDataObject = {
            planId: planResponse.data[0].planId,
            fee: planResponse.data[0].fees,
            fee_status: planResponse.data[0].fee_status,
            isToday: true,
          };
        } else {
          planDataObject = {
            planId: "You have no plan for today",
            fee: "",
            fee_status: "",
            isToday: false,
          };
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
        isToday: plan.isToday,
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
    <div className="profilescanner flex items-center justify-center  h-[40rem]">
      <div className="scanner flex-[1]  h-[30rem] flex items-center justify-center">
        {imageUrl ? (
          <a href={imageUrl} download>
            <img src={imageUrl} alt="img" className="w-[20rem]" />
          </a>
        ) : null}
      </div>
      <div className="info flex-[1]"></div>
    </div>
  );
};

export default ProfileScanner;
