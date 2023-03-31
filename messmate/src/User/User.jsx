import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Mainbar from "./Components/Mainbar";
import axios, { axiosPrivate } from "../Api/axios";
import useAuth from "../Auth/useAuth";

function User() {
  const [users, setUsers] = useState({});
  const { auth } = useAuth();
  useEffect(() => {
    // console.log(auth);
  }, []);

  return (
    <div >
      <main main className="flex bg-slate-100">
        <div className="shadow-2xl  flex-[2] ">
          <Sidebar />
        </div>

        <div className="mx-3 flex-[9]">
          <Mainbar />
        </div>
      </main>
    </div>
  );
}

export default User;
