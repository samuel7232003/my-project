import css from "./Login.module.css";
import { Input, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { User } from "../../context/userContext/userTypes"; // Import the User type
import { serviceLogin, serviceSignup } from "../../service/account";
import { actionSetUser } from "../../redux/user/user.action";
import { useAppDispatch, useAppSelector } from "../../redux/builder";

export default function Login() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [inforUser, setInforUser] = useState<User>({
    userName: "",
    password: "",
    name: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate(); // Debugging line to check user state

  const handleLogin = async () => {
    if (!inforUser.userName || !inforUser.password) {
      setError("Please enter both username and password");
      return;
    }

    const hasSpace = inforUser.userName.includes(" ");
    if (hasSpace) {
      setError("Username cannot contain spaces");
      return;
    }
    const response = await serviceLogin(inforUser.userName, inforUser.password);
    if (response.status !== 200) {
      setError("Invalid username or password");
      return;
    }
    if (response.status === 200) {
      dispatch(actionSetUser(response.data));
      navigate("/");
    }
  };

  const handleSignUp = async () => {
    if (!inforUser.name || !inforUser.password || !inforUser.userName) {
      setError("Please fill in all fields");
      return;
    }

    const hasSpace = inforUser.userName.includes(" ");
    if (hasSpace) {
      setError("Username cannot contain spaces");
      return;
    }

    const response = await serviceSignup(inforUser.userName, inforUser.password, inforUser.name);
    dispatch(actionSetUser(response.data));
    alert("Sign up successful! You will be logged in.");
    navigate("/");
  };

  return (
    <div className={css.loginBackground}>
      <div className={css.loginContainer}>
        <h1>Login</h1>
        <p>Email/ Username</p>
        <Input
          placeholder="Enter your email or username"
          value={inforUser.userName}
          onChange={(e) => setInforUser({ ...inforUser, userName: e.target.value })}
        />
        {isSignUp && (
          <div>
            <p>Your Name</p>
            <Input
              placeholder="Enter your name"
              value={inforUser.name}
              onChange={(e) => setInforUser({ ...inforUser, name: e.target.value })}
            />
          </div>
        )}
        <p>Password</p>
        <Input.Password
          placeholder="Enter your password"
          value={inforUser.password}
          onChange={(e) => setInforUser({ ...inforUser, password: e.target.value })}
        />
        {error && <p className={css.error}>{error}</p>}
        {isSignUp === false ? (
          <Button
            className={css.loginButton}
            type="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        ) : (
          <Button
            className={css.signUpButton}
            type="primary"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        )}
        {isSignUp === false ? (
          <p className={css.signupText}>
            Don't have an account?{" "}
            <span
              className={css.signupLink}
              onClick={() => {
                setIsSignUp(!isSignUp);
              }}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className={css.signupText}>
            Already have an account?{" "}
            <span
              className={css.signupLink}
              onClick={() => {
                setIsSignUp(!isSignUp);
              }}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
