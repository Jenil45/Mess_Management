import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col content-between ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
