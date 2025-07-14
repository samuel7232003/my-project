import css from "./Login.module.css";
import { Input, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useUserContext } from "../../context/userContext/userContext"; // Import the login and signup functions
import {
  actionLogin,
  actionSignup,
} from "../../context/userContext/userAction";
import { User } from "../../context/userContext/userTypes"; // Import the User type

export default function Login() {
  const [user, setUser] = useState<User>({
    userName: "",
    password: "",
    name: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate(); // Debugging line to check user state
  const { userState, userDispatch } = useUserContext(); // Use the custom hook to access user context

  useEffect(() => {
    if (userState.user) {
      navigate("/");
    }
  }, [userState.user, navigate]);

  const handleLogin = async () => {
    if (!user.userName || !user.password) {
      setError("Please enter both username and password");
      return;
    }

    const hasSpace = user.userName.includes(" ");
    if (hasSpace) {
      setError("Username cannot contain spaces");
      return;
    }
      await actionLogin(userDispatch, user.userName, user.password);
      setError(userState.error ?? ""); // Clear error on successful login
  };

  const handleSignUp = async () => {
    if (!user.name || !user.password || !user.userName) {
      setError("Please fill in all fields");
      return;
    }

    const hasSpace = user.userName.includes(" ");
    if (hasSpace) {
      setError("Username cannot contain spaces");
      return;
    }
      const response = await actionSignup(
        userDispatch,
        user.userName,
        user.password,
        user.name
      );
      alert("Sign up successful! You can now log in.");
      setError(userState.error ?? ""); // Clear error on successful signup
  };

  return (
    <div className={css.loginBackground}>
      <div className={css.loginContainer}>
        <h1>Login</h1>
        <p>Email/ Username</p>
        <Input
          placeholder="Enter your email or username"
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
        />
        {isSignUp && (
          <div>
            <p>Your Name</p>
            <Input
              placeholder="Enter your name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
        )}
        <p>Password</p>
        <Input.Password
          placeholder="Enter your password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
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
