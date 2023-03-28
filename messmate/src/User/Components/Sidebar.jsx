import React from "react";
import { Link } from "react-router-dom";
// import Dashboard from "../../Svg/Dashboard.svg";
import logOut from "../../Svg/logout.gif";
import confused from "../../Svg/confused.gif";
import information from "../../Svg/information.gif";
import fingerprintScan from "../../Svg/fingerprint-scan.gif";
import verified from "../../Svg/verified.gif";
import Rules from "../../Svg/Rules.gif";
import menu from "../../Svg/menu.gif";
// import banner from "../../Svg/banner.jpg";

// import attendent from "../../Svg/Attendent.svg";
// import subscription from "../../Svg/subscription.svg";
// import Profile from "../../Svg/Profile.svg";
// import Infopic from "../../Svg/Information.svg";
import useLogout from "../../Api/Logout";

function Sidebar() {
  const logout = useLogout();
  return (
    <>
      <div className="h-screen">
        <ul className="flex flex-col pl-0 mb-0 mt-[3rem] gap-[.5rem] z-2 ">
          <li className="  w-full">
            <Link
              className="py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors"
              to="/user"
            >
              <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img src={Rules} alt="Logout!" className="h-[50px] w-[100px]" />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Dashboard
              </span>
            </Link>
          </li>

          <li className="  w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/user/attendent"
            >
              <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img
                  src={verified}
                  alt="Logout!"
                  className="h-[50px] w-[100px]"
                />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Attendent
              </span>
            </Link>
          </li>

          <li className="  w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/user/subscription"
            >
              <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img
                  src={confused}
                  alt="Logout!"
                  className="h-[50px] w-[100px]"
                />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Subscription
              </span>
            </Link>
          </li>
          <li className=" w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/user/usermenu"
            >
              <div className="shadow-soft-2xl  mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img
                  src={menu}
                  alt="Logout!"
                  className="h-[50px] w-[100px]"
                />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                User Menu
              </span>
            </Link>
          </li>
          <li className="  w-full">
            <Link
              className="py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors"
              to="/user/information"
            >
              <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img
                  src={information}
                  alt="Logout!"
                  className="h-[50px] w-[100px]"
                />
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

          <li className="  w-full">
            <Link
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
              to="/user/editprofile"
            >
              <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img
                  src={fingerprintScan}
                  alt="Logout!"
                  className="h-[50px] w-[100px]"
                />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Profile
              </span>
            </Link>
          </li>

          <li className="  w-full">
            <button
              onClick={logout}
              className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
            >
              <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img
                  src={logOut}
                  alt="Logout!"
                  className="h-[50px] w-[100px]"
                />
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Log Out
              </span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
