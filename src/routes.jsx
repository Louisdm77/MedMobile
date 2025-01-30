import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Error from "./pages/error";

 const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },{
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
]);

export default router