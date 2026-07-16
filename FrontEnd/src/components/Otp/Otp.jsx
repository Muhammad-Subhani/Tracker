import { useState } from "react";
import { OtpValidation } from "../../services/Otpservice.js";
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext.js"
import { useContext } from "react";
export const OtpForm = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext)
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const email = location.state?.email;
  async function handleValidate() {
    const { ok, data } = await OtpValidation(email, otp);
    if (!ok) {
      setError(data.message || "Invalid OTP");
      return;
    }
    else {
      setAccessToken(data.Access);
      navigate("/");
    }
    console.log("Access token received:", data.Access);
    // next step: this is where we'll store data.Access in AuthContext
  }

  return (
    <>
      <h1>Enter OTP sent to {email}</h1>
      <input
        type="text"
        value={otp}
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleValidate}>Verify</button>
    </>
  );
};
