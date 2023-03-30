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
} from "recharts";

import axios from "../../Api/axios";

function Dashboad() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

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

        console.log("Get All User", response.data);
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

        console.log("Get All User", response.data);
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
        const response = await axios.get("/stats/getWeekProfit", {
          withCredentials: true,
        });

        console.log("Get All User", response.data);
        setData2(response.data);
        // console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);
  return (
    <div className="min-h-[100vh] flex flex-col gap-6">
      {/* ------------------------------------------- Header ------------------------------------------- */}
      <div className="header flex-[1] text-center self-center min-w-full mt-3 mb-2 pb-3">
        <h1 className="mb-3">Dashboard</h1>
        <hr />
      </div>

      {/* ----------------------------------------- First Chart ---------------------------------------- */}

      <div className="header flex-[9] flex flex-row">
        {/* ------------------------------------------ left part ----------------------------------------- */}
        <div className="left flex-[3] ">
          <div className=" flex align-items-center flex-col">
            <div>
              <h1 className="mb-4">First Chart </h1>
            </div>
            <ResponsiveContainer width="70%" aspect={3}>
              <AreaChart
                className=""
                data={data}
                stroke="black"
                margin={{ top: 10, right: 30, left: 5, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5F0A87" stopOpacity={1} />
                    <stop offset="95%" stopColor="#A4508B" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <XAxis
                  className=""
                  dataKey="date"
                  label={{
                    value: "Date",
                    position: "bottom",
                    offset: 5,
                    margin: 3,
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
          <div className="mt-5 flex align-items-center flex-col border-spacing-1">
            <div>
              <h1 className="mb-4">First Chart </h1>
            </div>
            <ResponsiveContainer width="70%" aspect={3}>
              <AreaChart
                className=""
                data={data2}
                stroke="black"
                margin={{ top: 10, right: 30, left: 5, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5F0A87" stopOpacity={1} />
                    <stop offset="95%" stopColor="#A4508B" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <XAxis
                  className=""
                  dataKey="date"
                  label={{
                    value: "Date",
                    position: "bottom",
                    offset: 5,
                    margin: 3,
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
                  dataKey="amount"
                  stroke="#5F0A87s"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ----------------------------------------- Right Part ----------------------------------------- */}

        <div className="right mt-10 flex-[3]  flex flex-col justify-center bg-red-500 ">
          <ResponsiveContainer>
            <PieChart width={400} height={400}>
              <Pie
                data={data1}
                cx="50%"
                cy="50%"
                labelLine={false}
                // label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {/* {data.map((entry, index) => (
                  <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  />
                ))} */}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboad;
