import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuMessageSquare } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../assets/context/userAuthContext";

export const SideBar = () => {
  const { clicked, setClicked, logOut } = useUserAuth();
  const navigation = [
    {
      name: "Home",
      icon: <IoHomeOutline />,
      link: "/",
    },
    {
      name: "Appointments",
      icon: <BsCalendarDate />,
      link: "/appointments",
    },
    {
      name: "Profile",
      icon: <FaRegUser />,
      link: "/profile",
    },
    {
      name: "Chat",
      icon: <IoChatbubbleOutline />,
      link: "#",
    },
    {
      name: "Feedback",
      icon: <LuMessageSquare />,
      link: "#",
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline />,
      link: "/settings",
    },
  ];

  return (
    <div className="bg-gray-300 h-screen fixed w-[20%]">
      <div className="  p-6 h-full ">
        <h2 className="text-center font-bold text-2xl mt-8">Medmobile</h2>
        <ul className="px-1 mt-8">
          {navigation.map((nav, index) => (
            <Link to={nav.link}>
              <li
                key={index}
                className="flex items-center  p-3 px-4 hover:bg-gray-500 rounded-xl mt-1 "
                style={{
                  backgroundColor: clicked === nav.name ? "black" : "",
                  color: clicked === nav.name ? "white" : "black",
                }}
                onClick={() => {
                  setClicked(nav.name);
                }}
              >
                <span className="mr-4 font-bold text-[20px] ">{nav.icon}</span>
                <span className=" text-[20px] font-medium">{nav.name}</span>
              </li>
            </Link>
          ))}

          <div className=" ">
            <Link to="/login" onClick={logOut}>
              <li className="flex items-center  p-3 px-4 hover:bg-gray-500 rounded-xl mt-1 ">
                <span className="mr-4 font-bold text-xl ">
                  <IoIosHelpCircleOutline />
                </span>{" "}
                <span className=" text-xl font-medium">Help</span>
              </li>
            </Link>
            <Link to="/login" onClick={logOut}>
              <li className="flex items-center  p-3 px-4 hover:bg-gray-500 rounded-xl mt-1">
                <span className="mr-4 font-bold text-xl ">
                  <MdOutlineLogout />
                </span>{" "}
                <span className=" text-xl font-medium">Logout</span>
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
