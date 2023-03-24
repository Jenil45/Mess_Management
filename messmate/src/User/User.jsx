import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Mainbar from "./Components/Mainbar";
import axios, { axiosPrivate } from "../Api/axios";
import useAuth from "../Auth/useAuth";

function User() {
  const [users, setUsers] = useState({});
  const { auth } = useAuth();
  useEffect(() => {
    console.log(auth);
  }, []);

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
