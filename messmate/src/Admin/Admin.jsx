import React from "react";
import Sidebar from "./Components/Sidebar";
import Mainbar from "./Components/Mainbar";

const Admin = () => {
  return (
    <div>
      <main main className="flex">
        <div className="border-r-2   border-black flex-[1.2] shadow-xl  shadow-blue-500/50">
          <Sidebar />
        </div>
        <div className="mx-3 mt-3 flex-[8]">
          <Mainbar />
        </div>
      </main>
    </div>
  );
};

export default Admin;
