import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../../Api/Logout";
/** Svg's */
import hat from "../../Svg/hat.gif";
import burger from "../../Svg/burger.gif";
import logOut from "../../Svg/logout.gif";
import confused from "../../Svg/confused.gif";
import verified from "../../Svg/verified.gif";
import hauntedHouse from "../../Svg/haunted-house.gif";
function Sidebar() {
  const logout = useLogout();
  return (
    <div className="h-screen ">
      <ul className="flex flex-col pl-0 mb-0 mt-[3rem] gap-[1.4rem]">
        <li className=" w-full">
          <Link
            className="py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors"
            to="/admin"
          >
            <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
            
              <img src={hauntedHouse} alt="sdfsd" className="h-[50px] w-[100px]" />
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
              Home Page
            </span>
          </Link>
        </li>

        <li className=" w-full">
          <Link
            className="py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
            to="/admin"
          >
            <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={verified} alt="sdfsd" className="h-[50px] w-[100px]" />
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
              Daily Attendent
            </span>
          </Link>
        </li>
        <li className=" w-full">
          <Link
            className=" text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
            to="/admin/menu"
          >
            <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={burger} alt="sdfsd" className="h-[50px] w-[100px]" />
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
              Menu Add
            </span>
          </Link>
        </li>

        <li className=" w-full">
          <Link
            className="py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
            to="/admin/adduser"
          >
            <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={hat} alt="sdfsd" className="h-[50px] w-[100px]" />
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
              Add user
            </span>
          </Link>
        </li>

        <li className="w-full ">
          <h6 className="pl-6 ml-2 text-lg font-bold leading-tight uppercase  opacity-100">
            Account pages
          </h6>
        </li>

        <li className=" w-full">
          <Link
            className="py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
            to="/admin/alluser"
          >
            <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              <img src={confused} alt="sdfsd" className="h-[50px] w-[100px]" />
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
              All User Detail
            </span>
          </Link>
        </li>

        <li className="w-full">
          <button
            onClick={logout}
            className="py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors"
          >
            <div className="shadow-soft-2xl    mr-2 flex h-[76px] w-[70px] items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1.5">
              
              <img src={logOut} alt="Logout!" className="h-[50px] w-[100px]" />
            </div>
            <button className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
              Log Out
            </button>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
