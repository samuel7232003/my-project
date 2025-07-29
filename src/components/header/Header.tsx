import css from "./Header.module.css";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../context/userContext/userAction";
import { useAppSelector, useAppDispatch } from "../../redux/builder";
import { actionClearUser } from "../../redux/user/user.action";
import { use, useEffect } from "react";

export default function Header() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLoginPageClick = () => {
    navigate("login");
  };

  const handleMainPageClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(actionClearUser());
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
      <p className={css.headerMid}>{user?.name}</p>
      <div className={css.headerRight}>
        {user.userName === "" ? (
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
