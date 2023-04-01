import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import LogOut from "../Svg/food-menu-3-svgrepo-com.svg";
import useAuth from "./../Auth/useAuth";
import useLogout from "../Api/Logout";

const Navbar = () => {
  const logout = useLogout();
  const { auth } = useAuth();
  const [loginModal, setLoginmodal] = useState(false);
  return (
    <header className="text-gray-900 body-font">
      <div className="container my-2 flex flex-wrap mt-2 max-w-[90%] rounded-2xl  mb-4 min-h-[10vh] bg-gradient-to-r from-[#020024] from-0% via-green-800 via-50%   to-lime-400 to-90%  flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900  md:mb-0"
        >
          <img src={LogOut} alt="Svg" className="h-10" />

          <span className="ml-3 text-xl text-white hover:no-underline no-underline">
            Mess Management
          </span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link
            to="/"
            className="mr-5 text-white text-lg hover:text-gray-900 hover:no-underline"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="mr-5 text-white text-lg hover:text-gray-900 hover:no-underline"
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className="mr-5 hover:text-gray-900 text-white text-lg hover:no-underline"
          >
            About us
          </Link>
        </nav>
        {auth.role === 0 ? (
          <div>
            <Link
              to="/user"
              className="mr-5 inline-flex items-center  bg-black text-white font-semibold text-lg hover:no-underline py-1 px-3 focus:outline-none  rounded p-2 md:mt-0"
            >
              Users
            </Link>
            <button
              className="inline-flex items-center bg-black border-0 text-white font-semibold text-lg mr-4 py-1 px-3 focus:outline-none  rounded    p-2 md:mt-0"
              onClick={logout}
            >
              Logout
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
        ) : auth.role === 1 ? (
          <>
            <Link
              to="/admin"
              className="mr-5 inline-flex items-center  bg-black text-white font-semibold text-lg hover:no-underline py-1 px-3 focus:outline-none  rounded p-2 md:mt-0"
            >
              Admin
            </Link>
            <button
              className="inline-flex items-center bg-black border-0 text-white font-semibold text-lg mr-4 py-1 px-3 focus:outline-none  rounded    p-2 md:mt-0"
              onClick={logout}
            >
              Logout
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
          </>
        ) : auth.role === 2 ? (
          <>
            <Link
              to="/employee"
              className="mr-5 inline-flex items-center  bg-black text-white font-semibold text-lg hover:no-underline py-1 px-3 focus:outline-none  rounded p-2 md:mt-0"
            >
              Employee
            </Link>
            <button
              className="inline-flex items-center bg-black border-0 text-white font-semibold text-lg mr-4 py-1 px-3 focus:outline-none  rounded    p-2 md:mt-0"
              onClick={logout}
            >
              Logout
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
          </>
        ) : (
          <button
            className="inline-flex items-center bg-black border-0 text-white font-semibold text-lg mr-4 py-1 px-3 focus:outline-none  rounded    p-2 md:mt-0"
            onClick={() => setLoginmodal(true)}
          >
            Login
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
        )}

        {loginModal ? <Modal setLoginmodal={setLoginmodal} /> : ""}
      </div>
    </header>
  );
};

export default Navbar;
