import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  return (
    <div className="p-6 grid grid-cols-[25%_60%_10%] gap-4 items-center mt-6 ">
      <div className=" ">
        <h1 className="font-extrabold text-2xl">Welcome, User</h1>
        <p className="font-medium">How may we be of help today?</p>
      </div>
      <div className="relative ">
        <input
          type="text"
          placeholder="Search"
          className=" rounded-full relative w-full h-10 p-2 bg-gray-300"
        />
        <button className="absolute right-3 top-3 text-xl">
          <IoSearchOutline />
        </button>
      </div>
      <div className="flex justify-between items-center ">
        <button className="bg-gray-300 rounded-full p-4  text-lg">
          <FaRegBell />
        </button>
        <button className="bg-gray-300 rounded-full p-4  text-lg">
          <FaRegUser />
        </button>
      </div>
    </div>
  );
};

export default Header;
