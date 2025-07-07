import css from "./Header.module.css";
import { Button } from "antd";
import React, { use, useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/user-context";

export default function Header() {
  const { state, dispatch } = useUser();
  const navigate = useNavigate();

  const handleLoginPageClick = () => {
    navigate("login");
  };

  const handleMainPageClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    console.log(state.isLoggedIn);
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
        {!state.isLoggedIn ? (
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
