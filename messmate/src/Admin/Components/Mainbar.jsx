import React from "react";
import { Outlet } from "react-router-dom";

function Mainbar() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}

export default Mainbar;
