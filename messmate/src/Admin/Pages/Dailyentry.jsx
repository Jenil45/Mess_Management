import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import EditModal from "./EditModal";
import dayjs from "dayjs";
import AllPlanTable from "./AllPlanTable";
import TodayStudent from "./TodayStudent";

const Dailyentry = () => {
  const [isSetAll, setIsSetAll] = useState(true);

  return (
    <div className="relative overflow-x-auto flex flex-col gap-[2rem] shadow-md sm:rounded-lg">
      <div className="flex items-center justify-center w-full p-3 gap-[4rem] ">
        <div className="flex gap-3 items-center justify-center">
          <input
            type="radio"
            id="html"
            name="fav_language"
            value="Menu Add"
            defaultChecked
            onChange={() => setIsSetAll(true)}
          />
          <label className="text-[1.3rem]">All Plan</label>
        </div>
        <div className="flex gap-3 items-center justify-center">
          <input
            type="radio"
            id="css"
            name="fav_language"
            value="Subscription Add"
            onChange={() => setIsSetAll(false)}
          />
          <label className="text-[1.3rem]">Today Students</label>
        </div>
      </div>
      <hr />

      {isSetAll ? <AllPlanTable /> : <TodayStudent />}
    </div>
  );
};

export default Dailyentry;
