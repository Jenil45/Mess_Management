import React from "react";
import { Outlet } from "react-router-dom";

const User = () => {
  return (
    <div>
      User page
      {/* navbar of admin dashboard + mainbar */}
      <Outlet />
    </div>
  );
};

export default User;
