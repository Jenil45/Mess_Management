import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "../../Svg/Dashboard.svg";
import LogOut from "../../Svg/LogOut.svg";
import attendent from "../../Svg/Attendent.svg";
import subscription from "../../Svg/subscription.svg";
import Profile from "../../Svg/Profile.svg";
import Infopic from "../../Svg/Information.svg";

function Sidebar() {
  return (
    <>
      <div className="border-x-2	h-screen">
        <ul className="flex flex-col pl-0 mb-0">
          <li className="mt-5 w-full">
            <Link
              className="py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors"
              to="/user"
            >
              <div className="bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                <img src={Dashboard} alt='Photo coming soon ..'  />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Dashboard
              </span>
            </Link>
          </li>

          <li className="mt-5 w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/user/attendent"
            >
              <div className="shadow-soft-2xl bg-gradient-to-tl from-blue-500  to-green-400    mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-1.5">
                <img src={attendent} />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Attendent
              </span>
            </Link>
          </li>

          <li className="mt-5 w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/user/subscription"
            >
              <div className="shadow-soft-2xl bg-gradient-to-tl from-blue-500  to-green-400    mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-1.5">
                <img src={subscription} />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Subscription
              </span>
            </Link>
          </li>
          <li className="mt-5 w-full">
            <Link
              className="py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors"
              to="/user/information"
            >
              <div className="shadow-soft-2xl bg-gradient-to-tl from-blue-500  to-green-400    mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-1.5">
                <img src={Infopic} />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Information
              </span>
            </Link>
          </li>
          <li className="w-full mt-4">
            <h6 className="pl-6 ml-2 text-lg font-bold leading-tight uppercase  opacity-100">
              Account pages
            </h6>
          </li>

          <li className="mt-5 w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/user/editprofile"
            >
              <div className="shadow-soft-2xl bg-gradient-to-tl from-blue-500  to-green-400    mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-1.5">
                <img src={Profile} />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Profile
              </span>
            </Link>
          </li>

          <li className="mt-5 w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/"
            >
              <div className="shadow-soft-2xl bg-gradient-to-tl from-blue-500  to-green-400    mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-1.5">
                <img src={LogOut} />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Log Out
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
