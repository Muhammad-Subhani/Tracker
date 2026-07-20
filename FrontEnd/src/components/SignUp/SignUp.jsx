import { useState } from "react"
import { SignupHelpers } from "../../services/signupApi.jsx";
export const SignupForm = function() {
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const { HandleButtonClick } = SignupHelpers()
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
      <button onClick={() => HandleButtonClick(username, email, password)}>Signup </button>
    </>
  )
}
