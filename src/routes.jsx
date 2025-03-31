import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Error from "./pages/error";
import Appointments from "./pages/appointments";
import ProtectedRoutes from "./components/protectedRoutes";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import BookAppointments from "./components/bookAppointments";
import OtpInputt from "./components/otpInput";
import Chat from "./pages/chat";
import Feedback from "./pages/feedback";
import ProfileEdit from "./components/editProfile";
import Help from "./pages/help";
import AdminHome from "./adminPages/home";
import AdminSignUp from "./adminPages/signUp";
import AdminLogin from "./adminPages/login";
import AdminChat from "./adminPages/adminChat";
import AdminAppointments from "./adminPages/adminAppointments";
import AdminSettings from "./adminPages/adminSettings";
import AdminHelp from "./adminPages/adminHelp";

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/appointments",
        element: <Appointments />,
        errorElement: <Error />,
      },
      {
        path: "/settings",
        element: <Settings />,
        errorElement: <Error />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error />,
      },
      { path: "/chat", element: <Chat />, errorElement: <Error /> },
      {
        path: "/bookappointment",
        element: <BookAppointments />,
        errorElement: <Error />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
        errorElement: <Error />,
      },
      {
        path: "/profileEdit",
        element: <ProfileEdit />,
        errorElement: <Error />,
      },
      {
        path: "/help",
        element: <Help />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/emailverify",
    element: <OtpInputt />,
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
  {
    path: "/admin/login",
    element: <AdminLogin />,
    errorElement: <Error />,
  },
  {
    path: "/admin/signup",
    element: <AdminSignUp />,
    errorElement: <Error />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/admin/home",
        element: <AdminHome />,
        errorElement: <Error />,
      },
      {
        path: "/admin/consultations",
        element: <AdminChat />,
        errorElement: <Error />,
      },
      {
        path: "/admin/appointments",
        element: <AdminAppointments />,
        errorElement: <Error />,
      },
      {
        path: "/admin/settings",
        element: <AdminSettings />,
        errorElement: <Error />,
      },
      {
        path: "/admin/help",
        element: <AdminHelp />,
        errorElement: <Error />,
      },
    ],
  },
]);

export default router;
