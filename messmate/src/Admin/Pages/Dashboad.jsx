import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Pie,
  PieChart,
  Sector,
  Cell,
  LineChart,
  Legend,
  Line,
} from "recharts";

import axios from "../../Api/axios";

function Dashboad() {
  const COLORS = ["#005298", "#004e40", "#ff0000"];
  const color = "#009d7f";
  const color1 = "#005298";
  const COLORS1 = ["#005298", "#004e40", "#ff0000", "#cc8400", "#964b00"];
  const [data, setData] = useState(null);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  console.log(data1);

  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get("/stats/getDayMember", {
          withCredentials: true,
        });

        // console.log("Get All User", response.data);
        setData(response.data);
        // console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);
  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get("/stats/getPlanCount", {
          withCredentials: true,
        });

        // console.log("Get All User", response.data);
        setData1(response.data);
        // console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);
  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get("/stats/getMonthlyExpenses", {
          withCredentials: true,
        });

        console.log("Get All User", response.data);
        setData3(response.data);
        // console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);
  useEffect(() => {
    const getData = async (e) => {
      // if button enabled with JS hack
      try {
        const response = await axios.get("/stats/getWeekProfit", {
          withCredentials: true,
        });

        // console.log("Get All User", response.data);
        setData2(response.data);
        // console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);
  return (
    <div className="mainbar ">
      <div className="m-main">
        <div className="m-title">
          <span className="text-[2rem] text-[#009d7f] h2 border-b-2 border-black pb-2 text-center">
            DASHBOARD
          </span>
        </div>
        <div className="flex items-center gap-[1rem]">
          <div className="card-container ">
            <div className="piecard bg-gray-200 w-[37rem] shadow-xl h-[20rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
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
                <PieChart width={300} height={500}>
                  <Pie
                    data={data1}
                    cx={150}
                    cy={250}
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="count"
                    label
                  >
                    {data1.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
            {/* <Piecard /> */}
            {/* <Piecard /> */}
          </div>
          <div className="card-container ">
            <div className="piecard bg-gray-200  shadow-xl w-[37rem] h-[20rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
              <div className="p-content flex flex-col gap-[1rem]">
                {/* <Time color="white" /> */}
                <span>Expenditure</span>

                <div className="flex gap-[0.5rem] items-center">
                  <div className="w-5 h-5 bg-[#964b00] rounded-full"></div>
                  <span>Vegetables</span>
                </div>
                <div className="flex gap-[0.5rem] items-center">
                  <div className="w-5 h-5 bg-[#004e40] rounded-full"></div>
                  <span>Vessels</span>
                </div>
                <div className="flex gap-[0.5rem] items-center">
                  <div className="w-5 h-5 bg-[#005298] rounded-full"></div>
                  <span>Liquid</span>
                </div>
                <div className="flex gap-[0.5rem] items-center">
                  <div className="w-5 h-5 bg-[#cc8400] rounded-full"></div>
                  <span>Essentials</span>
                </div>
                <div className="flex gap-[0.5rem] items-center">
                  <div className="w-5 h-5 bg-[#ff0000] rounded-full"></div>
                  <span>Miscellaneous</span>
                </div>
              </div>
              <div className="">
                <PieChart width={300} height={500}>
                  <Pie
                    data={data3}
                    cx={150}
                    cy={250}
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="expense"
                    label
                  >
                    {data3.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS1[index % COLORS1.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
            {/* <Piecard /> */}
            {/* <Piecard /> */}
          </div>
        </div>

        <div className="flex items-center gap-[1rem]">
          <div className="card-container ">
            <div className="piecard bg-gray-200 shadow-xl w-[37rem] h-[20rem] pt-[5rem] px-[1rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
              <ResponsiveContainer width="100%" height="100%" aspect={3}>
                <AreaChart
                  className=""
                  data={data2}
                  stroke="black"
                  idth={500}
                  height={500}
                  margin={{ top: 10, right: 30, left: 5, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`color${color}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={color}
                        stopOpacity={4}
                      ></stop>
                      <stop
                        offset="75%"
                        stopColor={color}
                        stopOpacity={0.25}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <XAxis
                    className=""
                    dataKey="date"
                    label={{
                      value: "Date",
                      // position: "bottom",
                      offset: 5,
                      margin: 3,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Profit",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <CartesianGrid strokeDasharray="5 5" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#5F0A87s"
                    fillOpacity={1}
                    fill={`url(#color${color})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card-container ">
            <div className="piecard bg-gray-200 shadow-xl w-[37rem] h-[20rem] pt-[5rem] px-[1rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
              <ResponsiveContainer width="100%" aspect={3}>
                <AreaChart
                  className=""
                  data={data}
                  stroke="black"
                  margin={{ top: 30, right: 30, left: 5, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`color${color1}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={color1}
                        stopOpacity={4}
                      ></stop>
                      <stop
                        offset="75%"
                        stopColor={color1}
                        stopOpacity={0.25}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <XAxis
                    className=""
                    dataKey="date"
                    label={{
                      value: "Date",
                      // position: "bottom",
                      offset: 10,
                      margin: 10,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Student no.",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <CartesianGrid strokeDasharray="5 5" />
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#5F0A87s"
                    fillOpacity={1}
                    // fill="url(#colorPv)"

                    activeDot={{ r: 8 }}
                    fill={`url(#color${color1})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* <Piecard /> */}
          {/* <Piecard /> */}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Dashboad;
