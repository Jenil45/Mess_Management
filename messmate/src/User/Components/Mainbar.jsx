import React from "react";
import { Outlet } from "react-router-dom";
import useLogout from "../../Api/Logout";
import useAuth from "../../Auth/useAuth";
import hello from "../../Svg/hi.svg";

const Mainbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  return (
    <div className=" mt-2 rounded-md  mb-6 ">
      <div className="text-gray-600 body-font  pt-4">
        <div className="container mx-auto flex flex-wrap  mb-4 flex-col md:flex-row items-center justify-between">
          <span className="flex title-font font-medium items-center text-gray-900  md:mb-0">
            <img className="h-20" src={hello} alt="coming"></img>
            <span className="ml-3 text-2xl font-semibold">
              {auth.name} {auth.userId}
            </span>
          </span>

          <button
            className="inline-flex items-center bg-black border-0 text-white font-semibold text-lg mr-4 py-1 px-3 focus:outline-none  rounded    p-2 md:mt-0"
            onClick={logout}
          >
            Log Out
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Mainbar;
