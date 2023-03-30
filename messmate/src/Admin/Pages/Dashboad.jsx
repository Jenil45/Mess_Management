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
  const COLORS1 = ["#005298", "#004e40", "#ff0000", "#cc8400", "#964b00"];
  const [data, setData] = useState(null);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  console.log(data1);
  // const data = [
  //   {
  //     date: '23',
  //     total_student: 15
  //   },
  //   {
  //     date: '23',
  //     total_student: 20
  //   },
  //   {
  //     date: '23',
  //     total_student: 30
  //   },
  // ]

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
    // <div className="min-h-[100vh] flex flex-col gap-6">
    //   {/* ------------------------------------------- Header ------------------------------------------- */}
    //   <div className="header flex-[1] text-center self-center min-w-full mt-3 mb-2 pb-3">
    //     <h1 className="mb-3">Dashboard</h1>
    //     <hr />
    //   </div>

    //   {/* ----------------------------------------- First Chart ---------------------------------------- */}

    //   <div className="header flex-[9] flex flex-row">
    //     {/* ------------------------------------------ left part ----------------------------------------- */}
    //     <div className="left flex-[3] ">
    //       <div className=" flex align-items-center flex-col">
    //         <div>
    //           <h1 className="mb-4">First Chart </h1>
    //         </div>

    //       </div>
    //       <div className="mt-5 flex align-items-center flex-col border-spacing-1">
    //         <div>
    //           <h1 className="mb-4">First Chart </h1>
    //         </div>

    //       </div>
    //     </div>

    //     {/* ----------------------------------------- Right Part ----------------------------------------- */}

    //     <div className="right mt-10 flex-[3]  flex flex-col justify-center bg-red-500 ">
    //       <ResponsiveContainer>
    //         <PieChart width={400} height={400}>
    //           <Pie
    //             data={data1}
    //             cx="50%"
    //             cy="50%"
    //             labelLine={false}
    //             // label={renderCustomizedLabel}
    //             outerRadius={80}
    //             fill="#8884d8"
    //             dataKey="count"
    //           >
    //             {/* {data.map((entry, index) => (
    //               <Cell
    //               key={`cell-${index}`}
    //               fill={COLORS[index % COLORS.length]}
    //               />
    //             ))} */}
    //           </Pie>
    //           <Tooltip />
    //         </PieChart>
    //       </ResponsiveContainer>
    //     </div>
    //   </div>
    // </div>
    <div className="mainbar">
      <div className="m-main">
        <div className="m-title">
          <span>DASHBOARD</span>
          <span>Mess Management</span>
        </div>
        <div className="flex items-center gap-[1rem]">
          <div className="card-container ">
            <div className="piecard bg-gray-300 w-[40rem] h-[20rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
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
            <div className="piecard bg-gray-300 w-[40rem] h-[20rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
              <div className="p-content flex flex-col gap-[1rem]">
                {/* <Time color="white" /> */}
                <span>Plan Distribution</span>

                <div className="flex gap-[0.5rem] items-center">
                  <div className="w-5 h-5 bg-[#ff0000] rounded-full"></div>
                  <span>Store A</span>
                </div>
                <div className="flex gap-[0.5rem] items-center">
                  <div className="w-5 h-5 bg-[#004e40] rounded-full"></div>
                  <span>Store B</span>
                </div>
                <div className="flex gap-[0.5rem] items-center">
                  <div className="w-5 h-5 bg-[#005298] rounded-full"></div>
                  <span>Store C</span>
                </div>
                <div className="flex gap-[0.5rem] items-center">
                  <div className="w-5 h-5 bg-[#964b00] rounded-full"></div>
                  <span>Store D</span>
                </div>
                <div className="flex gap-[0.5rem] items-center">
                  <div className="w-5 h-5 bg-[#cc8400] rounded-full"></div>
                  <span>Store E</span>
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
            <div className="piecard bg-gray-300 w-[40rem] h-[20rem] pt-[5rem] px-[1rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
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
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5F0A87" stopOpacity={1} />
                      <stop
                        offset="95%"
                        stopColor="#A4508B"
                        stopOpacity={0.3}
                      />
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
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card-container ">
            <div className="piecard bg-gray-300 w-[40rem] h-[20rem] pt-[5rem] px-[1rem] flex items-center mt-[1.5rem] rounded-[1rem] justify-around">
              <ResponsiveContainer width="100%" aspect={3}>
                <AreaChart
                  className=""
                  data={data}
                  stroke="black"
                  margin={{ top: 30, right: 30, left: 5, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5F0A87" stopOpacity={1} />
                      <stop
                        offset="95%"
                        stopColor="#A4508B"
                        stopOpacity={0.3}
                      />
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
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#5F0A87s"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* <Piecard /> */}
          {/* <Piecard /> */}
        </div>
      </div>

      <div className="line-card">
        {/* <Linecard /> */}
        {/* <Linecard /> */}
        {/* <Piecard /> */}
      </div>
    </div>
    // </div>
  );
}

export default Dashboad;
