import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../Api/axios.js";
import useAuth from "../Auth/useAuth";
import closeBtnpic from "../Svg/close.svg";
import Alert from "./Alert";

const Email_Checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function Modal({ setLoginmodal }) {
  const { setAuth } = useAuth();
  const [alert, setalert] = useState({
    mode: false,
    message: "",
    type: "bg-[red]",
  });
  // navigate and set or exist path take
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // validation in all fields
  useEffect(() => {
    setValidEmail(Email_Checker.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(true);
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  // handling submit
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email);

    // if button enabled with JS hack
    const e1 = Email_Checker.test(email);
    const e2 = validPassword;
    console.log(e1, e2);
    if (!e1 || !e2) {
      // setErrMsg("Invalid Entry");
      console.log(errMsg);
      setalert({
        mode: true,
        message: "Invalid Entry",
        type: "bg-[red]",
      });
      return;
    }
    try {
      console.log("Inside try block");
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("After request", response);

      console.log(JSON.stringify(response?.data));
      const name = response.data.name;
      const newEmail = response.data.email;
      const mobileno = response.data.mobileno;
      const accessToken = response.data.accessToken;
      const role = response.data.role;

      // setAuth on login
      setAuth({ name, email: newEmail, mobileno, role, accessToken });

      // navigate to where it comes from
      setLoginmodal(false);
      navigate(role === 0 ? "/user" : "/admin", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setalert({
          mode: true,
          message: "No server Responce ",
          type: "bg-[red]",
        });
      } else if (err.response?.status === 409) {
        setalert({
          mode: true,
          message: "User not available",
          type: "bg-[red]",
        });
      } else {
        setalert({
          mode: true,
          message: "User Not Found",
          type: "bg-[red]",
        });
      }
    }
  };
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={() => setLoginmodal(false)}
      />

      <div className="flex fixed left-[35%] min-w-[30%] max-w-[31%]   transform overflow-hidden  p-9  bg-gray-100 rounded-lg   flex-col    md:mt-0 ">
        <div className="flex">
          <h2 className="grow h-14 text-gray-900 text-3xl text-center font-medium title-font mb-2">
            Add user
          </h2>
          <div class="flex-none ">
            <img
              src={closeBtnpic}
              alt=""
              className=" cursor-pointer min-h-[35px] min-w-[35px] mt-1"
              onClick={() => setLoginmodal(false)}
            />
          </div>
        </div>
        {alert.mode ? <Alert alert={alert} setalert={setalert} /> : ""}
        <form>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            onClick={handleLogin}
            className="text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Login
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Literally you probably haven't heard of them jean shorts.
          </p>
        </form>
      </div>
    </div>
  );
}
export default Modal;
