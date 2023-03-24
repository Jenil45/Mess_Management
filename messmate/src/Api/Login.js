import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../Api/axios";
import useAuth from "../Auth/useAuth";

const Email_Checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Login = () => {

    const {setAuth} = useAuth()

    // navigate and set or exist path take
    const location = useLocation()
    const navigate = useNavigate()


    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

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
    // if button enabled with JS hack
    const e1 = Email_Checker.test(email);
    const e2 = validPassword;
    if (!e1 || !e2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({email , password}),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

        console.log(JSON.stringify(response?.data));
        const email = response.data.email
        const accessToken = response.data.accessToken
        const role = response.data.role

        // setAuth on login
        setAuth({email , role , accessToken})


        //clear state and controlled inputs
        setEmail("");
        setPassword("");

        // navigate to where it comes from
        navigate("/" , {replace:true})
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Missing Email or password");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return <div>Add user</div>;
};

export default Login;
