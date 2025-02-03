import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Error from "./pages/error";
import ProtectedRoutes from "./components/protectedRoutes";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      // {
      //   path: "/post",
      //   element: <Post />,
      //   errorElement: <Error />,
      // },
      // {
      //   path: "/myphotos",
      //   element: <Myphotos />,
      //   errorElement: <Error />,
      // },
      // {
      //   path: "/profile",
      //   element: <Profile />,
      //   errorElement: <Error />,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },

  {
    path: "/error",
    element: <Error />,
    errorElement: <Error />,
  },
]);

export default router;
