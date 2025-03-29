import React from "react";
import { LiaUser } from "react-icons/lia";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";

const MessangerInfo = () => {
  const { user, patientDetail, clickedUser } = useUserAuth();
  return (
    <div className="grid grid-cols-[7%_65%_20%] view p-4 gap-6 text-white rounded-xl ">
      <div className="text-4xl flex justify-center ">
        <LiaUser className="bg-gray-200 rounded-full" />
      </div>
      <div className="block">
        <div className="font-bold">
          {clickedUser.name ? clickedUser.name : "user"}
        </div>
        <div className="text-sm">{clickedUser.profession}</div>
      </div>
      <div className="flex items-center">
        <button className="font-bold text-2xl mr-4">
          <IoIosCall />
        </button>{" "}
        <button className="font-bold text-2xl mr-4">
          <IoVideocam />
        </button>
        <button className="font-bold text-2xl">
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};

export default MessangerInfo;
