import React from "react";
import css from "./Login.module.css";
import { Input, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../context/user-context"; // Importing the user context to manage user state
import axios from "axios";
import { login, signup } from "../../service/account";
import { sign } from "crypto";


export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [error, setError] = useState("");
  const { state, dispatch } = useUser(); 
  const [isSignUp, setIsSignUp] = useState(false); 
  const navigate = useNavigate();// Debugging line to check user state

  const handleLogin = async () => {
    if (!userName || !password) {
      setError("Please enter both username and password");
      return;
    }

    const hasSpace = userName.includes(" ");
    if (hasSpace) {
      setError("Username cannot contain spaces");
      return;
    }

    try {
      const response = await login(userName, password);
      dispatch({ type: "LOGIN", payload: response.data });
      setError("");
      navigate("/");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(errorMessage);
    }
  };

  const handleSignUp = async () => {
    if (!userName || !password || !name) {
      setError("Please fill in all fields");
      return;
    }

    const hasSpace = userName.includes(" ");
    if (hasSpace) {
      setError("Username cannot contain spaces");
      return;
    }

    try {
      const response = await signup(userName, password, name);
      dispatch({ type: "SIGNUP", payload: response.data });
      alert("Sign up successful! You can now log in.");
      setError("");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || "Sign up failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className={css.loginBackground}>
      <div className={css.loginContainer}>
        <h1>Login</h1>
        <p>Email/ Username</p>
        <Input
          placeholder="Enter your email or username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {isSignUp && (
          <div>
            <p>Your Name</p>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <p>Password</p>
        <Input.Password
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={css.error}>{error}</p>}
        {isSignUp === false ?(
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
