import React from "react";
import Sidebar from "./Components/Sidebar";
import Mainbar from "./Components/Mainbar";

function User() {
  return (
    <div>
      <main main className="flex">
        <div className=" border-r-2 border-black  flex-[1.2]">
          <Sidebar />
        </div>

        <div className="mx-3 flex-[8]">
          <Mainbar />
        </div>
      </main>
    </div>
  );
}

export default User;
