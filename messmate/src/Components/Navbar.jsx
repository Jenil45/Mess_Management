import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import LogOut from "../Svg/food-menu-3-svgrepo-com.svg";

const Navbar = () => {
  const [loginModal, setLoginmodal] = useState(false);
  return (
    <header className="text-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-3 fixed bg-lime-100  flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg> */}

          <img src={LogOut} alt="Svg" className="h-16" />
          <span className="ml-3 text-xl">Mess Management</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/contact" className="mr-5 hover:text-gray-900">
            Contact Us
          </Link>
          <Link to="/about" className="mr-5 hover:text-gray-900">
            About us
          </Link>
          <Link to="" className="mr-5 hover:text-gray-900">
            Menu
          </Link>
          <Link to="" className="mr-5 hover:text-gray-900">
            Fourth Link
          </Link>
        </nav>
        <button
          className="inline-flex items-center bg-green-500 border-0 text-white py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-base   p-2 md:mt-0"
          onClick={() => setLoginmodal(true)}
        >
          LogIn
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

        {loginModal ? <Modal setLoginmodal={setLoginmodal} /> : ""}
      </div>
    </header>
  );
};

export default Navbar;
