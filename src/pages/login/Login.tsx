import React from "react";
import css from "./Login.module.css";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { account } from "../../datas/data"; // Assuming account is an array of user objects

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userName || !password) {
      setError("Please enter both username and password");
      return;
    }

    const hasSpace = userName.includes(" ");
    if (hasSpace) {
      setError("Username cannot contain spaces");
      return;
    }

    const isValidUserName = account.find((user) => user.username === userName);
    if (!isValidUserName) {
      setError("Cant find user with this username");
    } else {
      setError("");
      const isValidPassword = account.find(
        (user) => user.password === password && user.username === userName
      );
      if (!isValidPassword) {
        setError("Invalid password");
      } else {
        setError("");
        localStorage.setItem("loggedInUser", JSON.stringify(isValidUserName));
        navigate("/");
      }
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
        <p>Password</p>
        <Input.Password
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={css.error}>{error}</p>}
        <Button
          className={css.loginButton}
          type="primary"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
