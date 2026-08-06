import axios from "./api.js"
const API_ENDPOINT = "/Auth/SignUP"
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
import { useNavigate } from "react-router-dom"
import { useRef, useEffect, useState } from "react"

export const SignupHelpers = function() {

  const userRef = useRef();
  useEffect(() => { userRef.current.focus() }, [])
  const errRef = useRef();
  const Navigate = useNavigate();
  const [errmsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  async function HandleButtonClick(username, email, password) {
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      errRef.current.focus();
      setErrMsg("Invalid Entry ")
      return;
    }
    try {
      const response = await axios.post(API_ENDPOINT,
        JSON.stringify({ username: username, email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
      if (response.status == 200 || response.status == 201)
        Navigate("/Auth/otp", { state: { email } })
    } catch (err) {
      if (!err?.response) setErrMsg("NO Server Response ");
      else if (err?.response?.status == 400) setErrMsg("Error occured ")
      errRef.current.focus();
    }
  }
  return {
    HandleButtonClick,
    errRef,
    errmsg,
    setErrMsg,
    success,
    setSuccess,
  }
}
