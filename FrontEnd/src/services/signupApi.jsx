import axios from "./api.js"
const API_ENDPOINT = "/Auth/SignUP"
import { useNavigate } from "react-router-dom"

export const SignupHelpers = function() {

  const Navigate = useNavigate();

  async function HandleButtonClick(username, email, password) {
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
      if (!err?.response) console.log("NO Server Response ");
      else if (err?.response?.status == 400) console.log("Error occured ")
    }
  }
  return {
    HandleButtonClick
  }
}
