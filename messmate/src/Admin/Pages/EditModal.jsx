import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../Api/axios";
import Alert from "../../Components/Alert";
import closeBtnpic from "../../Svg/close.svg";

const Email_Checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const Mobile_Cheker = /^[6-9]\d{9}$/gi;

function EditModal(props) {
  // const { setAuth } = useAuth();
  const [alert, setalert] = useState({
    mode: false,
    message: "",
    type: "bg-[red]",
  });

  const [name, setName] = useState("");
  const [id, setId] = useState(0);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [mobileno, setMobileNo] = useState();
  const [validMobile, setValidMobile] = useState(false);

  const [role, setRole] = useState(0);

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
    setErrMsg("");
  }, [email]);

  useEffect(() => {
    const getData = async (userEmail) => {
      // if button enabled with JS hack
      console.log("Inside effect", userEmail);
      try {
        const response = await axios.get(`/users/getuser/${userEmail}`, {
          withCredentials: true,
        });

        // console.log("Get All User", response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setMobileNo(response.data.mobileno);
        setId(response.data.userId);
        setRole(response.data.role);
        console.log(JSON.stringify(response));
      } catch (err) {
        console.log(err);
      }
    };

    getData(props.userEmail);
  }, []);

  // handling submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("inside update");
    // if button enabled with JS hack
    const e1 = Email_Checker.test(email);
    if (!e1) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.patch(
        `/users/update/${id}`,
        JSON.stringify({ name, email, mobileno, role }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);

      //clear state and controlled inputs
      props.setEditmodal(false);
    } catch (err) {
      setalert({
        mode: true,
        message: err.message,
        type: "bg-[red]",
      });
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
        onClick={() => props.setEditmodal(false)}
      />

      <div className="flex fixed left-[35%] min-w-[30%] max-w-[31%]   transform overflow-hidden  p-7  bg-gray-100 rounded-lg   flex-col    md:mt-0 ">
        <div className="flex">
          <h2 className="grow h-14 text-gray-900 text-3xl text-center font-medium title-font mb-2">
            Edit user
          </h2>
          <div class="flex-none ">
            <img
              src={closeBtnpic}
              alt=""
              className=" cursor-pointer min-h-[35px] min-w-[35px] mt-1"
              onClick={() => props.setEditmodal(false)}
            />
          </div>
        </div>
        {alert.mode ? <Alert alert={alert} setalert={setalert} /> : ""}
        <form>
          <div className="relative mb-4">
            <label
              htmlFor="full-name"
              className="leading-7 text-sm text-gray-600"
            >
              User Id
            </label>
            <input
              type="text"
              id="full-name"
              name="name"
              onChange={(e) => e.target.value}
              value={id}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
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
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
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

          <button
            onClick={handleUpdate}
            className="text-white bg-indigo-600 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditModal;
