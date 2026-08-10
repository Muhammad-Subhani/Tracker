import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  SignupHelpers,
} from "../../services/signupApi.jsx";
import { UserFormHooks } from "../../hooks/useSignupHook.jsx"
export const SignupForm = function() {

  const {
    HandleButtonClick,
    errRef,
    errmsg,
    UserRef,
  } = SignupHelpers()
  const {
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

  } = UserFormHooks();
  return (
    <>
      <h1>This is SignUP Form </h1>
      <p ref={errRef} aria-live="assertive" className={errmsg ? "err" : "normal"}>{errmsg}</p>
      <label htmlFor="username">Username</label>
      <span className={isuservalid ? "valid" : "hide"}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span className={isuservalid || !username ? "hide" : "invalid"}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
      <input
        id="username"
        type="text"
        required
        ref={UserRef}
        autoComplete="off"
        onFocus={() => setFocus((prev) => ({ ...prev, username: true }))}
        onBlur={() => setFocus((prev) => ({ ...prev, username: false }))}
        aria-invalid={isuservalid ? false : true}
        aria-describedby="uidnote"
        value={username}
        placeholder="enter username "
        onChange={((e) => setUserame(e.target.value))}
      />
      <p id="uidnote" className={onfocus.username && !isuservalid && username ? "instructions" : "offscreen"}>
        <FontAwesomeIcon icon={faInfoCircle} />
        4-24 caharcters allowed <br />
        must start with a letter <br />
        letter numbers and hyphens and special keywords allowed !
      </p>
      <label htmlFor="Email">Email</label>
      <input
        id="Email"
        type="text"
        required
        autoComplete="off"
        ref={UserRef}
        onFocus={() => setFocus((prev) => ({ ...prev, email: true }))}
        onBlur={() => setFocus((prev) => ({ ...prev, email: false }))}
        value={email}
        placeholder="enter email "
        onChange={((e) => setEmail(e.target.value))}
      />
      <label htmlFor="Password">Password</label>
      <span className={ispwdvalid ? "valid" : "hide"}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span className={ispwdvalid || !password ? "hide" : "invalid"}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
      <input
        id="Password"
        required
        autoComplete="off"
        ref={UserRef}
        type="text"
        aria-invalid={ispwdvalid}
        aria-describedby="pwdnote"
        value={password}
        onFocus={() => setFocus((prev) => ({ ...prev, password: true }))}
        onBlur={() => setFocus((prev) => ({ ...prev, password: false }))}
        placeholder="enter username "
        onChange={((e) => setPassword(e.target.value))}
      />
      <p id="pwdnote" className={onfocus.password && !ispwdvalid && password ? "instructions" : "offscreen"}>
        <FontAwesomeIcon icon={faInfoCircle} />
        8-23 caharcters allowed <br />
        must start with a letter <br />
        Must Have one Upper Case one Lower Case and one special character  !
      </p>

      <button onClick={() => HandleButtonClick(username, email, password)}>Signup </button>
    </>
  )
}
