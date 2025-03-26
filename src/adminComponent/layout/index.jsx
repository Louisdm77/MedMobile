import React from "react";
import AdminSideBar from "../sideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex justify-between h-full opacity-0 lg:opacity-100">
      <aside className="w-[25%] h-auto">
        <AdminSideBar />
      </aside>
      <div className="w-full child">{children}</div>
    </div>
  );
};
export default AdminLayout;
