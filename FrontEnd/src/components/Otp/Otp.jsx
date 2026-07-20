import { useState } from "react";
import { useLocation } from "react-router-dom"
import { OtpHelper } from "../../services/OtpApi.jsx";
export const OtpForm = () => {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const email = location.state?.email;
  const { HandleButtonClick } = OtpHelper()
  return (
    <>
      <h1>Enter OTP sent to {email}</h1>
      <input
        type="text"
        value={otp}
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={() => HandleButtonClick(email, otp)}>Verify</button>
    </>
  );
};
