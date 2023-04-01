import React from "react";
import { Link, useLocation } from "react-router-dom";
import logOut from "../../Svg/logout.gif";
import confused from "../../Svg/confused.gif";
import information from "../../Svg/information.gif";
import fingerprintScan from "../../Svg/fingerprint-scan.gif";
import verified from "../../Svg/verified.gif";
import Rules from "../../Svg/Rules.gif";
import menu from "../../Svg/menu.gif";

import useLogout from "../../Api/Logout";

function Sidebar() {
  const logout = useLogout();
  const Location = useLocation();
  const activecolor = "bg-white shadow-xl ";
  const active1 = Location.pathname === "/user" ? `${activecolor}` : "";
  const active2 =Location.pathname === "/user/attendance" ? `${activecolor}` : "";
  const active3 = Location.pathname === "/user/subscription" ? `${activecolor}` : "";
  const active4 = Location.pathname === "/user/usermenu" ? `${activecolor}` : "";
  const active5 =Location.pathname === "/user/information" ? `${activecolor}` : "";
  const active6 =Location.pathname === "/user/editprofile" ? `${activecolor}` : "";


  return (
    <>
      <div className="min-h-[100vh]  my-2 ml-3 rounded-2xl bg-gray-200">
        <ul className="flex flex-col  pl-0 mb-0 mt-2 gap-[.3rem] z-2 ">
          <li className="w-full mt-4 hidden md:block">
            <h6 className=" ml-2  text-center text-lg font-bold text-black leading-tight uppercase  opacity-100">
              Hello User
            </h6>
          </li>
          <hr className="bg-black mt-3 hidden md:block" />

          <li className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem] ${active1} rounded-xl `}>
            <Link
              className="  flex  flex-row justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
              to="/user"
            >
              <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img src={Rules} alt="Logout!" className="h-[50px] w-[100px]" />
              </div>
              <span className="ml-1 text-[1rem] hidden md:block text-black hover:text-black ">
                Dashboard
              </span>
            </Link>
          </li>
          {/* <li className="w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem] bg-yellow-300 rounded-xl ">
            <Link
              className="  flex  flex-row justify-around px-4  hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
              to="/user/attendent"
            >
              <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img src={verified} alt="Logout!" className="h-[50px] w-[100px]" />
              </div>
              <span className="ml-1 text-[1rem] hidden sm:block text-black hover:text-black ">
                Attendent
              </span>
            </Link>
          </li> */}

          <li className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem] ${active2} rounded-xl `}>
            <Link
              className="  flex  flex-row  justify-start pl-1 pr-2  hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
              to="/user/attendance"
            >
              <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img
                  src={verified}
                  alt="Logout!"
                  className="h-[50px] w-[100px]"
                />
              </div>
              <span className="ml-1 text-[1rem] hidden md:block text-black hover:text-black ">
                Attendance
              </span>
            </Link>
          </li>

          <li className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem] ${active3} rounded-xl `}>
            <Link
              className="  flex  flex-row  justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
              to="/user/subscription"
            >
              <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img
                  src={confused}
                  alt="Logout!"
                  className="h-[50px] w-[100px]"
                />
              </div>
              <span className="ml-1 text-[1rem] hidden md:block text-black hover:text-black ">
                 Your Plan
              </span>
            </Link>
          </li>

          <li className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem] ${active4} rounded-xl `}>
            <Link
              className="  flex  flex-row  justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
              to="/user/usermenu"
            >
              <div className="shadow-soft-2xl pl-2  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img src={menu} alt="Logout!" className="h-[50px] w-[100px]" />
              </div>
              <span className="ml-1 text-[1rem] hidden md:block text-black hover:text-black ">
                User Menu
              </span>
            </Link>
          </li>

          <li className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem] ${active5} rounded-xl `}>
            <Link
              className="  flex  flex-row  justify-start pl-1 pr-2  hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
              to="/user/information"
            >
              <div className="shadow-soft-2xl ml-1  mr-2  flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img
                  src={information}
                  alt="Logout!"
                  className="h-[50px] w-[100px]"
                />
              </div>
              <span className="ml-1 text-[1rem] hidden md:block text-black hover:text-black ">
                Information
              </span>
            </Link>
          </li>

          {/* ---------------------------------------- Account part ---------------------------------------- */}

          <li className="w-full  mt-8 hidden md:block">
            <h6 className=" ml-2  text-center text-lg  text-black font-bold leading-tight uppercase  opacity-100">
              Account
            </h6>
          </li>
          <hr className="bg-black mt-3 hidden md:block" />

          <li className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem] ${active6} rounded-xl `}>
            <Link
              className="  flex  flex-row justify-start pl-1 pr-2  hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
              to="/user/editprofile"
            >
              <div className="shadow-soft-2xl ml-2  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img
                  src={fingerprintScan}
                  alt="Logout!"
                  className="h-[50px] w-[100px]"
                />
              </div>
              <span className="ml-1 text-[1rem] hidden md:block text-black hover:text-black ">
                Profile
              </span>
            </Link>
          </li>

          <li className={`w-[80%]  p-[1.2px] mb-4 mt-4 mx-auto py-[0.5rem]  rounded-xl `}>
            <button
              className=" flex ml-3 flex-row justify-start  pl-1 pr-2  hover:no-underline  outline-none  shadow-soft-xl text-sm   items-center whitespace-nowrap rounded-lg   font-semibold "
              onClick={logout}
            >
              <div className=" mr-2  flex h-[40px] w-[50px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
                <img src={logOut} alt="Logout!" className="h-[50px] w-[80px]" />
              </div>
              <span className="ml-1 text-[1rem] hidden md:block text-black hover:text-black ">
                Logout
              </span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
