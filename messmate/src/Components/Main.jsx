import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col content-between justify-between min-h-[100vh] bg-gradient-to-t bg-slate-200  ">
      <Navbar />
      <Outlet className="mt-32"> </Outlet>
      <Footer />
    </div>
  );
};

export default Main;
