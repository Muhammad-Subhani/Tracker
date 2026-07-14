import { useState } from "react";
import { OtpValidation } from "../../services/Otpservice.js";

export const OtpForm = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  async function handleValidate() {
    const { ok, data } = await OtpValidation(email, otp);
    if (!ok) {
      setError(data.message || "Invalid OTP");
      return;
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
