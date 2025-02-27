import React from "react";
import SideBar from "../sideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex justify-between h-full opacity-0 lg:opacity-100">
      <aside className="w-[25%] h-auto">
        <SideBar />
      </aside>
      <div className="w-full child">{children}</div>
    </div>
  );
};
export default Layout;
