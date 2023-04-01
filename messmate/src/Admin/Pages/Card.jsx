import React from "react";

const Card = ({ scanResultWebCam, takeAttendance, info }) => {
  return (
    <div className=" lg:pr-10 lg:py-6 mb-6 lg:mb-0  w-[28rem] p-[1rem] border border-[1px] border-black border">
      <div className="flex mb-4">
        <span className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
          {scanResultWebCam.name}:{info} Status Ok
        </span>
      </div>
      <p>{scanResultWebCam.userId}</p>
      <div className="flex border-t border-gray-200 py-2">
        <span className="text-gray-500 flex-[1]">Email </span>
        <span className="flex-[1] text-gray-900">{scanResultWebCam.email}</span>
      </div>
      <div className="flex border-t border-gray-200 py-2">
        <span className="text-gray-500 flex-[1]">Current Plan Id</span>
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
          className="flex ml-auto text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 hover:border-2 hover:border-black rounded"
          onClick={() =>
            takeAttendance(scanResultWebCam.userId, scanResultWebCam.planId)
          }
        >
          Verify
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
  );
};

export default Card;
