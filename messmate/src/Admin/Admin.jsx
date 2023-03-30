import React from "react";
import Sidebar from "./Components/Sidebar";
import Mainbar from "./Components/Mainbar";

const Admin = () => {
  return (
    <div>
      <main main className="flex position-relative gap-[1rem]">
        <div className="flex-[2]">
          <Sidebar />
        </div>
        <div className=" mt-3 flex-[9] mr-[0.2rem]">
          <Mainbar />
        </div>
      </main>
    </div>
  );
};

export default Admin;
