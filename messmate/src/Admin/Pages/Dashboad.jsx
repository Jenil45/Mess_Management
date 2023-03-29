import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Pie, PieChart } from 'recharts';

function Dashboad() {
  const data = [
    {
      date: '23',
      total_student: 15
    },
    {
      date: '23',
      total_student: 20
    },
    {
      date: '23',
      total_student: 30
    },
  ]
  return (
    <div className='min-h-[100vh] flex flex-col gap-6'>

      {/* ------------------------------------------- Header ------------------------------------------- */}
      <div className='header flex[1] text-center self-center min-w-full mt-3 mb-2 pb-3'>
        <h1 className='mb-3'>Dashboard</h1>
        <hr />

      </div>

      {/* ----------------------------------------- First Chart ---------------------------------------- */}

      <div className='header flex[9] flex flex-row'>

      {/* ------------------------------------------ left part ----------------------------------------- */}
        <div className="left min-w-[75%]">
          <div className=' flex align-items-center flex-col'>

            <div><h1 className='mb-4'>First Chart </h1></div>
            <ResponsiveContainer width="70%" aspect={3}>
              <AreaChart className="" data={data}
                stroke='black'
                margin={{ top: 10, right: 30, left: 5, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5F0A87" stopOpacity={1} />
                    <stop offset="95%" stopColor="#A4508B" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <XAxis className='' dataKey="date" label={{ value: "Date", position: 'bottom', offset: 5, margin: 3 }} />
                <YAxis label={{ value: "Student no.", angle: -90, position: 'insideLeft' }} />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip />
                <Area type="monotone" dataKey="total_student" stroke="#5F0A87s" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className='mt-5 flex align-items-center flex-col border-spacing-1'>

            <div><h1 className='mb-4'>First Chart </h1></div>
            <ResponsiveContainer width="70%" aspect={3}>
              <AreaChart className="" data={data}
                stroke='black'
                margin={{ top: 10, right: 30, left: 5, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5F0A87" stopOpacity={1} />
                    <stop offset="95%" stopColor="#A4508B" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <XAxis className='' dataKey="date" label={{ value: "Date", position: 'bottom', offset: 5, margin: 3 }} />
                <YAxis label={{ value: "Student no.", angle: -90, position: 'insideLeft' }} />
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip />
                <Area type="monotone" dataKey="total_student" stroke="#5F0A87s" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

      {/* ----------------------------------------- Right Part ----------------------------------------- */}

        <div className="right mt-10 min-w-[25%] flex flex-col justify-center ">
          <PieChart className='' width={200} height={300}>
            <Pie className='' data={data} dataKey="total_student" labelLine={true} nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={30} fill="#8884d8" />
          </PieChart>
        </div>
      </div>
    </div>
  )
}

export default Dashboad