import { Routes, Route } from "react-router-dom"
import { OtpForm } from "./components/Otp/Otp.jsx"
import { SignupForm } from "./components/SignUp/SignUp.jsx"
import { LoginForm } from "./components/Login/Login.jsx"
export const App = function() {
  return (
    <Routes >
      <Route path="/Auth/SignUP" element={<SignupForm />} />
      <Route path="/Auth/otp" element={<OtpForm />} />
      <Route path="/Auth/Login" element={<LoginForm />} />

    </Routes>
  )
}
// the motive of App.jsx is just to handle routes whatever file you make the only way to render them is
// to place them in this . one more things this is not the main page the page that will hold your tracker and 
// other components it a separate main file lets call dashboard that will be rendered when we route at "/"
