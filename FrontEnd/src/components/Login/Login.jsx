import { useState } from "react"
import { LoginUser } from "../../services/loginApi.js"
export const LoginForm = function() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  async function HandleLogin() {
    const { ok, data } = await LoginUser(email, password);
    if (!ok) {
      setError(data.message || "ِinvalid error")
      return;
    }
    console.log(`data : ${data}`);
  }
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
      <button onClick={HandleLogin}>Login </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  )
}
