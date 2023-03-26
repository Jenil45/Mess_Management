import React from "react";
import Sidebar from "./Components/Sidebar";
import Mainbar from "./Components/Mainbar";

const Admin = () => {
  return (
    <div>
      <main main className="flex position-relative">
        <div className="flex-[1.4]"></div>
        <div className="border-r-2 position-fixed  border-black flex-[1.2] shadow-xl  shadow-blue-500/50">
          <Sidebar />
        </div>
        <div className=" mt-3 flex-[8] pb-[5rem]">
          <Mainbar />
        </div>
      </main>
    </div>
  );
};

export default Admin;
