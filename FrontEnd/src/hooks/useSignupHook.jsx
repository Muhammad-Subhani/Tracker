import { useState } from "react"
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
export const UserFormHooks = function() {

  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");

  // validations if the user entered data according tio the requiremenst 
  const isuservalid = USER_REGEX.test(username);
  const ispwdvalid = PWD_REGEX.test(password);

  const [onfocus, setFocus] = useState({ username: false, email: false, password: false });
  return {
    username,
    setUserame,
    password,
    setPassword,
    isuservalid,
    ispwdvalid,
    email,
    setEmail,
    onfocus,
    setFocus,
  }
}
