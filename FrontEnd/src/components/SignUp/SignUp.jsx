import { useState } from "react"
import { SignUpUser } from "../../services/signupApi"
import { useNavigate } from "react-router-dom"
export const SignupForm = function() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  async function HandleSignUP() {
    const { ok, data } = await SignUpUser(username, email, password);
    if (!ok) {
      setError(data.message || "ِinvalid error")
      return;
    }
    navigate("/Auth/otp", { state: { email } })
  }
  return (
    <>
      <h1>This is SignUP Form </h1>
      <label>Username</label>
      <input type="text"
        value={username}
        placeholder="enter username "
        onChange={((e) => setUserame(e.target.value))}
      />
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
      <button onClick={HandleSignUP}>Signup </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  )
}
