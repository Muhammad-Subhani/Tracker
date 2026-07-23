import { useState } from "react"
import { LoginHelper } from "../../services/LoginApi.jsx";
import { useNavigate } from "react-router-dom";
export const LoginForm = function() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { HandleButtonClick } = LoginHelper()
  // there is use of location in Private Routes make sure you use that 
  const navigate = useNavigate();
  return (
    <>
      <h1>This is Login Form </h1>
      <label>Email</label>
      <input type="text"
        value={email}
        placeholder="enter email "
        onChange={((e) => setEmail(e.target.value))}
      />
      <label>Password</label>
      <input type="text"
        value={password}
        placeholder="enter username "
        onChange={((e) => setPassword(e.target.value))}
      />
      <button onClick={() => HandleButtonClick(email, password)}>Login </button>
      <p onClick={() => navigate("/Auth/SignUP")}>New User Try Signup !!</p>

    </>
  )
}
