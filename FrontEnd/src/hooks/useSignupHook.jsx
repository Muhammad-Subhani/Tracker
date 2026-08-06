import { useState } from "react"
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
export const UserFormHooks = function() {
  // to draw user attention to screen when error occures 

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  // actual error to be displayed 

  // validations if the user entered data according tio the requiremenst 
  const isuservalid = USER_REGEX.test(user);
  const ispwdvalid = PWD_REGEX.test(pwd);

  const [onfocus, setFocus] = useState({ user: false, pwd: false, match: false });
  return {
    user,
    setUser,
    pwd,
    setPwd,
    isuservalid,
    ispwdvalid,
    onfocus,
    setFocus,
  }
}
