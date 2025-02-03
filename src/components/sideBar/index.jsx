import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { LuMessageSquare } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

export const SideBar = () => {
  const navigation = [
    {
      name: "Home",
      icon: <IoHomeOutline />,
    },
    {
      name: "Appointments",
      icon: <BsCalendarDate />,
    },
    {
      name: "Profile",
      icon: <FaRegUser />,
    },
    {
      name: "Chat",
      icon: <IoChatbubbleOutline />,
    },
    {
      name: "Feedback",
      icon: <LuMessageSquare />,
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline />,
    },
  ];

  const [clicked, setClicked] = useState("");
  return (
    <div className="bg-gray-300 h-full">
      <div className="  p-4 h-full ">
        <h2 className="text-center font-bold text-3xl mt-8">Medmobile</h2>
        <ul className="px-1 mt-8">
          {navigation.map((nav, index) => (
            <li
              key={index}
              className="flex items-center  p-3 px-4 hover:bg-gray-500 rounded-xl mt-3 "
              style={{
                backgroundColor: clicked === nav.name ? "black" : "",
                color: clicked === nav.name ? "white" : "black",
              }}
              onClick={() => {
                setClicked(nav.name);
              }}
            >
              <span className="mr-4 font-bold text-xl ">{nav.icon}</span>
              <span className=" text-xl font-medium">{nav.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
