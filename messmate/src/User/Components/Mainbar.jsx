import React from "react";
import { Outlet } from "react-router-dom";

const Mainbar = () => {
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap mt-4 mb-4 flex-col md:flex-row items-center justify-between">
          <a className="flex title-font font-medium items-center text-gray-900  md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 text-white p-2 bg-red-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Hello @user</span>
          </a>

          {/* <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900" href="/">
              First Link
            </a>
            <a className="mr-5 hover:text-gray-900" href="/">
              Second Link
            </a>
            <a className="mr-5 hover:text-gray-900" href="/">
              Third Link
            </a>
            <a className="mr-5 hover:text-gray-900" href="/">
              Fourth Link
            </a>
          </nav> */}
          <button className="group rounded-2xl h-10 w-40 bg-green-500 font-bold text-lg text-white relative overflow-hidden">
            Log out
            <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Mainbar;
