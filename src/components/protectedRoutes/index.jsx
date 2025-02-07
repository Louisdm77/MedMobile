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
    return (
      <div className="flex justify-center items-center h-screen">
        <div class="flex items-center justify-center h-screen">
          <div class="relative">
            <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return user ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );
  }
};

export default ProtectedRoutes;
