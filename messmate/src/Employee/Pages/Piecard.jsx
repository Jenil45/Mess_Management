import React from "react";
import { PieChart } from "recharts";

const Piecard = () => {
  return (
    <div className="card-container ">
      <div className="piecard bg-gray-300 w-[55rem] h-[15rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
        <div className="p-content flex flex-col gap-[1rem]">
          {/* <Time color="white" /> */}
          <span>Plan Distribution</span>
          <div className="flex gap-[0.5rem] items-center">
            <div className="w-5 h-5 bg-[#ff0000] rounded-full"></div>
            <span>Daily</span>
          </div>
          <div className="flex gap-[0.5rem] items-center">
            <div className="w-5 h-5 bg-[#004e40] rounded-full"></div>
            <span>Weekly</span>
          </div>
          <div className="flex gap-[0.5rem] items-center">
            <div className="w-5 h-5 bg-[#005298] rounded-full"></div>
            <span>Monthly</span>
          </div>
        </div>
        <div className="">
          <PieChart width={200} height={200}>
            <Pie
              data={data3}
              cx={100}
              cy={100}
              innerRadius={30}
              outerRadius={50}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="expense"
              label
            >
              {/* {data3.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))} */}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      {/* <Piecard /> */}
      {/* <Piecard /> */}
    </div>
  );
};

export default Piecard;
