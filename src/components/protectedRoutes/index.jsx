import * as React from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { auth } from "../../assets/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const ProtectedRoutes = () => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">...</div>;
  } else {
    return user ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );
  }
};

export default ProtectedRoutes;
