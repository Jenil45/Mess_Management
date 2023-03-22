import React from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      Admin page
      {/* navbar of admin dashboard + mainbar */}
      <Outlet />
    </div>
  );
};

export default Admin;
