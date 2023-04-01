import React from "react";
import SignupPhoto from "../../Svg/Signup.png";
import { useEffect, useRef, useState } from "react";
import axios from "../../Api/axios";
import Alert from "../../Components/Alert";

const Email_Checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const Mobile_Cheker = /^[6-9]\d{9}$/gi;

const Adduser = () => {
  const [alert, setalert] = useState({
    mode: false,
    message: "",
    type: "bg-[red]",
  });

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [mobileno, setMobileNo] = useState();
  const [validMobile, setValidMobile] = useState(false);

  const [role, setRole] = useState(0);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [cpassword, setCPassword] = useState("");
  const [validCPasswd, setValidCPasswd] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // validation in all fields
  useEffect(() => {
    setValidEmail(Email_Checker.test(email));
  }, [email]);

  useEffect(() => {
    setValidEmail(Mobile_Cheker.test(mobileno));
  }, [mobileno]);

  useEffect(() => {
    setValidPassword(true);
    setValidCPasswd(password === cpassword);
  }, [password, cpassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, cpassword]);

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const e1 = Email_Checker.test(email);
    const e2 = validPassword;
    if (!e1 || !e2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        "/users/signup",
        JSON.stringify({ name, email, mobileno, role, password, cpassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);

      //clear state and controlled inputs
      setName("");
      setEmail("");
      setMobileNo("");
      setRole(0);
      setPassword("");
      setCPassword("");
      setalert({
        mode: true,
        message: "User registered successfully",
        type: "bg-[green]",
      });
    } catch (err) {
      if (!err?.response) {
        setalert({
          mode: true,
          message: "No Server Response",
          type: "bg-[red]",
        });
      } else if (err.response?.status === 409) {
        setalert({
          mode: true,
          message: "User Name Taken",
          type: "bg-[red]",
        });
      } else {
        setalert({
          mode: true,
          message: "Registration failed",
          type: "bg-[red]",
        });
      }
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        {alert.mode ? <Alert alert={alert} setalert={setalert} /> : ""}
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0  flex-[5] pr-4">
            <img
              src={SignupPhoto}
              aria-hidden
              className="min-h-fit"
              alt="Photo coming please wait"
            />
          </div>
          <div className="lg:w-2/6 md:w-1/2 p-9 ml-8 bg-gray-100 rounded-lg  flex flex-[5] flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-3xl text-center font-medium title-font ">
              Add user
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="full-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="full-name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
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
                  htmlFor="contact"
                  className="leading-7 text-sm text-gray-600"
                >
                  Contact Number
                </label>
                <input
                  type="number"
                  id="contact"
                  name="mobileno"
                  onChange={(e) => setMobileNo(e.target.value)}
                  value={mobileno}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Role
                </label>
                <select
                  id="countries_disabled"
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={0} defaultChecked>
                    User
                  </option>
                  <option value={1}> Admin </option>
                  <option value={2}> Employee </option>
                </select>
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  id="password"
                  name="cpassword"
                  onChange={(e) => setCPassword(e.target.value)}
                  value={cpassword}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-900 rounded text-lg">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Adduser;
