import path from "path";
import Login from "./page/login/Login";
import Home from "./Home";
import { create } from "domain";
import { createBrowserRouter } from "react-router-dom";
import Main from "./page/main/Main";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "",
                element: <Main />,
            },
            {
                path: "login",
                element: <Login />,
            }
        ]
    },
])