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
import  addInventory from "../../Svg/inventoryUnscreen.gif";


function Sidebar() {
  const Location = useLocation();
  const activecolor = "bg-white shadow-xl ";
  const active1 = Location.pathname === "/admin" ? `${activecolor}` : "";
  const active2 =
    Location.pathname === "/admin/attendance" ? `${activecolor}` : "";
  const active3 =
    Location.pathname === "/admin/qrattendance" ? `${activecolor}` : "";
  const active4 = Location.pathname === "/admin/menu" ? `${activecolor}` : "";
  const active5 =
    Location.pathname === "/admin/adduser" ? `${activecolor}` : "";
  const active6 =
    Location.pathname === "/admin/inventory" ? `${activecolor}` : "";
  const active7 =
    Location.pathname === "/admin/alluser" ? `${activecolor}` : "";

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
            to="/admin"
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
          className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem]  rounded-xl ${active2}`}
        >
          <Link
            className="flex  flex-row justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
            to="/admin/attendance"
          >
            <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={verified} alt="sdfsd" className="h-[50px] w-[100px]" />
            </div>
            <span className="ml-1 text-[1rem] hidden sm:block text-black hover:text-black">
              Daily Attendent
            </span>
          </Link>
        </li>
        <li
          className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem]  rounded-xl ${active3}`}
        >
          <Link
            className="flex  flex-row justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
            to="/admin/qrattendance"
          >
            <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={fingerprintScan} alt="sdfsd" className="h-[50px] w-[100px]" />
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
            to="/admin/menu"
          >
            <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={burger} alt="sdfsd" className="h-[50px] w-[100px]" />
            </div>
            <span className="ml-1 text-[1rem] hidden sm:block text-black hover:text-black">
              Menu Add
            </span>
          </Link>
        </li>

        <li
          className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem]  rounded-xl ${active5}`}
        >
          <Link
            className="flex  flex-row justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
            to="/admin/adduser"
          >
            <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={addUser} alt="sdfsd" className="h-[50px] w-[100px] bg-transparent" />
            </div>
            <span className="ml-1 text-[1rem] hidden sm:block text-black hover:text-black">
              Add user
            </span>
          </Link>
        </li>
        <li
          className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem]  rounded-xl ${active6}`}
        >
          <Link
            className="flex  flex-row justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
            to="/admin/inventory"
          >
            <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={addInventory} alt="sdfsd" className="h-[50px] w-[100px]" />
            </div>
            <span className="ml-1 text-[1rem] hidden sm:block text-black hover:text-black">
              Inventory
            </span>
          </Link>
        </li>

        <li className="w-full  mt-8 hidden sm:block">
          <h6 className="ml-2  text-center text-lg  text-black font-bold leading-tight uppercase  opacity-100">
            Account pages
          </h6>
        </li>
<hr class="bg-black mt-3 hidden sm:block" />
        <li
          className={`w-[80%]  p-[1.2px]  mt-4 mx-auto py-[0.5rem]  rounded-xl ${active7}`}
        >
          <Link
            className="flex  flex-row justify-start pl-1 pr-2 hover:no-underline  outline-none  shadow-soft-xl text-sm  m-auto items-center whitespace-nowrap rounded-lg   font-semibold "
            to="/admin/alluser"
          >
            <div className="shadow-soft-2xl  mr-2 flex h-[40px] w-[60px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={confused} alt="sdfsd" className="h-[50px] w-[100px]" />
            </div>
            <span className="ml-1 text-[1rem] hidden sm:block text-black hover:text-black">
              All User Detail
            </span>
          </Link>
        </li>

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
