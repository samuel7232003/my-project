import path from "path";
import Login from "./pages/login/Login";
import Home from "./screens/Home";
import { create } from "domain";
import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/main/Main";
import { ProductDetail } from "./pages/productDetail/productDetail";
import { useProductContext } from "./context/productContext/productContext";

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
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      }
    ],
  },
]);
