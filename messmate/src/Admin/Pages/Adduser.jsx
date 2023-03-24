import React, { useEffect, useRef, useState } from "react";
import axios from "../../Api/axios";

const Email_Checker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const Mobile_Cheker = /^[6-9]\d{9}$/gi;
const Adduser = () => {
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
      setMobileNo();
      setRole(0);
      setPassword("");
      setCPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return <div>Add user</div>;
};

export default Adduser;
