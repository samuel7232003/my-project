import css from "./Header.module.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/builder";
import { actionClearUser } from "../../redux/user/user.action";

export default function Header() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("login");
  };

  const handleMainPage = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(actionClearUser());
    navigate("login");
  };

  console.log("Header user", user);

  return (
    <header>
      <div className={css.headerLeft}>
        <Button
          color="cyan"
          size="large"
          variant="text"
          onClick={handleMainPage}
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
            onClick={handleLoginPage}
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
