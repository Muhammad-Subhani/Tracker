import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "./api.js"
const API_ENDPOINT = "/Auth/otp";
import { useNavigate } from "react-router-dom";
export const OtpHelper = function() {
  const Navigate = useNavigate();
  const {
    setAccessToken,
    setLoading,
  } = useContext(AuthContext)
  async function HandleButtonClick(email, otp) {
    try {
      const response = await axios.post(API_ENDPOINT,
        { email: email, otp: otp },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        })
      if (response?.status == 200 || response?.status == 201) {
        setAccessToken(response.data.Access);
        setLoading(false)
        Navigate("/");
      }
    } catch (err) {
      // console log for now but then will replaced by the error 
      if (!err?.response) console.log("No Respond from the backend ");
      else if (err.response?.status == 400) console.log("Error occured ");
    }
  }
  return {
    HandleButtonClick
  }
}
