import React from "react";
import { Link, useLocation } from "react-router-dom";
import useLogout from "../../Api/Logout";
/** Svg's */
import hat from "../../Svg/hat.gif";
import burger from "../../Svg/burger.gif";
import logOut from "../../Svg/logout.gif";
import confused from "../../Svg/confused.gif";
import verified from "../../Svg/verified.gif";
import hauntedHouse from "../../Svg/haunted-house.gif";
import fingerprintScan from "../../Svg/fingerprint-scan.gif";
import addUser from "../../Svg/User_1_unscreen.gif";
import addInventory from "../../Svg/inventoryUnscreen.gif";

function Sidebar() {
  const Location = useLocation();
  const activecolor = "bg-white shadow-xl ";
  const active1 = Location.pathname === "/employee" ? `${activecolor}` : "";
  const active2 =
    Location.pathname === "/employee/attendance" ? `${activecolor}` : "";
  const active3 =
    Location.pathname === "/employee/qrattendance" ? `${activecolor}` : "";
  const active4 =
    Location.pathname === "/employee/menu" ? `${activecolor}` : "";
  const active5 =
    Location.pathname === "/employee/adduser" ? `${activecolor}` : "";
  const active6 =
    Location.pathname === "/employee/inventory" ? `${activecolor}` : "";
  const active7 =
    Location.pathname === "/employee/alluser" ? `${activecolor}` : "";

  console.log(Location);
  const logout = useLogout();
  return (
    <div className="min-h-[100vh] w-[16rem]  my-2 ml-3 rounded-2xl bg-gray-200">
      <ul className="flex flex-col   pl-0 mb-0 mt-2 gap-[.3rem] z-2">
        <li className=" w-full mt-4 hidden sm:block">
          <h6 className=" ml-2  text-center text-lg font-bold text-black leading-tight uppercase  opacity-100">
            Hello Admin
          </h6>
        </li>
        <hr className="bg-black mt-3 hidden sm:block" />

        <li
          className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem]  rounded-xl  ${active1}`}
        >
          {/* <li className="w-[80%]  p-[1.2px]  mt-4 text-white mx-auto py-[0.5rem] bg-gradient-to-r to-green-900 to-0% via-green-800 via-50%   fr from-90% rounded-xl "> */}
          <Link
            className="flex  flex-row justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
            to="/employee"
          >
            <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img
                src={hauntedHouse}
                alt="sdfsd"
                className="h-[50px] w-[100px] "
              />
            </div>
            <span className="ml-1 text-[1rem] hidden sm:block text-black hover:text-black">
              Home Page
            </span>
          </Link>
        </li>

        <li
          className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem]  rounded-xl ${active3}`}
        >
          <Link
            className="flex  flex-row justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
            to="/employee/qrattendance"
          >
            <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img
                src={fingerprintScan}
                alt="sdfsd"
                className="h-[50px] w-[100px]"
              />
            </div>
            <span className="ml-1 text-[1rem] hidden sm:block text-black hover:text-black">
              QR Attendent
            </span>
          </Link>
        </li>
        <li
          className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem]  rounded-xl ${active4}`}
        >
          <Link
            className="flex  flex-row justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
            to="/employee/menu"
          >
            <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={burger} alt="sdfsd" className="h-[50px] w-[100px]" />
            </div>
            <span className="ml-1 text-[1rem] hidden sm:block text-black hover:text-black">
              Menu Add
            </span>
          </Link>
        </li>

        <hr class="bg-black mt-3 hidden sm:block" />

        <li className={`w-[80%]  p-[1.2px]  mt-4 mb-2 py-[0.5rem]  rounded-xl`}>
          <button
            onClick={logout}
            className="flex  flex-row justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
          >
            <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={logOut} alt="Logout!" className="h-[50px] w-[100px]" />
            </div>
            <button className="ml-1 text-[1rem] duration-300 opacity-100 pointer-events-none ease-soft">
              Log Out
            </button>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
