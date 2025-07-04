import css from "./Header.module.css";
import { Button } from "antd";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/user-context"; // Importing the user context to manage user state

export default function Header() {
  const { state, dispatch } = useUser(); // Using the user context to get and set user state
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (state.user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [state]);

  const handleLoginPageClick = () => {
    navigate("login");
  };

  const handleMainPageClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header>
      <div className={css.headerLeft}>
        <Button
          color="cyan"
          size="large"
          variant="text"
          onClick={handleMainPageClick}
        >
          Main Page
        </Button>
      </div>
      <p className={css.headerMid}>{state.user?.name}</p>
      <div className={css.headerRight}>
        {!isLoggedIn ? (
          <Button
            color="cyan"
            size="large"
            variant="text"
            onClick={handleLoginPageClick}
          >
            Login
          </Button>
        ) : (
          <Button
            color="cyan"
            size="large"
            variant="text"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
