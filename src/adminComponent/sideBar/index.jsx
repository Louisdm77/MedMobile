import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { FaStaffSnake } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../assets/context/userAuthContext";

const AdminSideBar = () => {
  const { clicked, setClicked, logOut } = useUserAuth();

  const navigation = [
    {
      name: "Dashboard",
      icon: <IoHomeOutline />,
      link: "/admin/home",
    },
    {
      name: "Appointments",
      icon: <BsCalendarDate />,
      link: "",
    },
    {
      name: "Patient Records",
      icon: <AiOutlineFileText />,
      link: "",
    },
    {
      name: "Consultation",
      icon: <IoIosChatbubbles />,
      link: "",
    },
    {
      name: "Reviews",
      icon: <MdOutlineFeedback />,
      link: "",
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline />,
      link: "",
    },
  ];

  return (
    <div>
      {" "}
      <div className="color h-screen fixed w-[20%]">
        <div className="  p-6 h-full ">
          <h2 className="text-center font-bold text-2xl mt-6 flex items-center">
            <span className="snake">
              <FaStaffSnake />
            </span>
            <span>Medmobile</span>
          </h2>
          <ul className="px-1 mt-8">
            {navigation.map((nav, index) => (
              <Link to={nav.link}>
                <li
                  key={index}
                  className="flex items-center  p-3 px-4 hover:bg-gray-500 rounded-xl mt-1 "
                  style={{
                    backgroundColor: clicked === nav.name ? "white" : "",
                  }}
                  onClick={() => {
                    setClicked(nav.name);
                  }}
                >
                  <span className="mr-4 font-bold text-[15px] ">
                    {nav.icon}
                  </span>
                  <span className=" text-[20px] font-medium">{nav.name}</span>
                </li>
              </Link>
            ))}

            <div className=" ">
              <Link to="/help">
                <li
                  className="flex items-center  p-3 px-4 hover:bg-gray-500 rounded-xl mt-1 "
                  style={{
                    backgroundColor: clicked === "help" ? "white" : "",
                  }}
                  onClick={() => {
                    setClicked("help");
                  }}
                >
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
    </div>
  );
};

export default AdminSideBar;
