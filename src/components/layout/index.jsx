import React from "react";
import SideBar from "../sideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex justify-between h-[100vh]">
      <aside className="w-[25%] h-full">
        <SideBar />
      </aside>
      <div className="w-full">{children}</div>
    </div>
  );
};
export default Layout;
