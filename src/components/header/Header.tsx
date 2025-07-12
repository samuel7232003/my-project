import css from "./Header.module.css";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useUserContext } from "../../context/userContext/userContext";
import { logout } from "../../context/userContext/userAction";

export default function Header() {
  const navigate = useNavigate();
  const { state, dispatch } = useUserContext();

  const handleLoginPageClick = () => {
    navigate("login");
  };

  const handleMainPageClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout(dispatch);
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
        {!state.user ? (
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
