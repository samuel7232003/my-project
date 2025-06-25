import path from "path";
import Login from "./Login";
import Main from "./Main";
import { create } from "domain";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/main",
        element: <Main />,
    },
])