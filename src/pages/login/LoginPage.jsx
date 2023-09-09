import "./signup.css";
import { useContext, createRef, useEffect } from "react";
import { Auth } from "../../components/AuthenticationContext";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

export const LoginPage = () => {
  const { isUserInfoMatched } = useContext(Auth);

  const navigate = useNavigate();

  const userNameRef = createRef();
  const passowrdRef = createRef();
  const wrongCredentials = createRef();

  const loginFormRef = createRef();
  const signupFormRef = createRef();

  useEffect(() => {
    userNameRef.current.focus();
  }, [userNameRef]);

  // This function gets the username and password and gives them to the Authentication context to check if they are true
  // If they are matched the information will be saved and the function will navigate the user to the home page

  const handleClick = () => {
    const userName = userNameRef.current.value;
    const password = passowrdRef.current.value;
    const userInfo = { userName: userName, password: password };
    if (userName === "") {
      wrongCredentials.current.classList.add("wrong-credentials");
      wrongCredentials.current.innerHTML =
        "<h3>Wrong Credentials</h3> Invalid username or password";
      return;
    }
    if (password === "") {
      wrongCredentials.current.classList.add("wrong-credentials");
      wrongCredentials.current.innerHTML =
        "<h3>Wrong Credentials</h3> Enter your password please";
      return;
    }
    if (isUserInfoMatched(userInfo)) {
      navigate("/", { replace: true });
    } else {
      wrongCredentials.current.classList.add("wrong-credentials");
      wrongCredentials.current.innerHTML =
        "<h3>Wrong Credentials</h3> Invalid username or password ";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleClick();
  };

  const removeError = () => {
    wrongCredentials.current.classList.remove("wrong-credentials");
    wrongCredentials.current.innerHTML = "";
  };

  const handleLoginForm = () => {
    loginFormRef.current.style.left = "0px";
    signupFormRef.current.style.right = "-100%";
  };

  const handleSignupForm = () => {
    loginFormRef.current.style.left = "-100%";
    signupFormRef.current.style.right = "0px";
  };

  return (
    <div className="container">
      <div className="login-page">
        <div className="login-container">
          <div className="login-page-content">
            <h1>Kenpatchisocial</h1>
            <p>Connect with friends and the world around you on Lamasocial.</p>
          </div>
          <div className="registration">
            <form ref={loginFormRef} className="login-form">
              <div>Please login</div>
              <div ref={wrongCredentials}></div>
              <div>
                <FontAwesomeIcon className="userIcon icon" icon={faUser} />
                <input
                  ref={userNameRef}
                  onInput={removeError}
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div>
                <FontAwesomeIcon className="lockIcon icon" icon={faLock} />
                <input
                  ref={passowrdRef}
                  onInput={removeError}
                  type="password"
                  placeholder="Password"
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div className="login-button" onClick={handleClick}>
                Log into Account
              </div>
              <div onClick={handleSignupForm} className="new-account">
                New Account?
              </div>
            </form>
            <form ref={signupFormRef} className="signup-form">
              <div>Please Sign Up</div>
              <div>
                <FontAwesomeIcon className="userIcon icon" icon={faUser} />
                <input type="text" placeholder="Username" />
              </div>
              <div>
                <FontAwesomeIcon className="mailIcon icon" icon={faEnvelope} />
                <input type="text" placeholder="Email" />
              </div>
              <div>
                <FontAwesomeIcon className="lockIcon icon" icon={faLock} />
                <input type="text" placeholder="Password" />
              </div>
              <div>
                <FontAwesomeIcon className="lockIcon icon" icon={faLock} />
                <input type="text" placeholder="Password Again" />
              </div>
              <label>Gender:</label>
              <select name="Gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input type="submit" value="Sign Up" />
              <FontAwesomeIcon
                onClick={handleLoginForm}
                className="backwardsIcon"
                icon={faBackward}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
