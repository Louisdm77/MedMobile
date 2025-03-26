import React, { useEffect } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../adminComponent/layout";

const AdminHome = () => {
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <AdminLayout>
        <div>AdminHome</div>
      </AdminLayout>
    </div>
  );
};

export default AdminHome;
