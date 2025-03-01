import React from "react";
import { LiaUser } from "react-icons/lia";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { BsThreeDotsVertical } from "react-icons/bs";

const MessangerInfo = () => {
  const { user, patientDetail } = useUserAuth();
  return (
    <div className="grid grid-cols-[7%_80%_5%] view p-4 gap-6 text-white">
      <div className="text-4xl flex justify-center   ">
        <LiaUser className="bg-gray-200 rounded-full" />
      </div>
      <div className="block">
        <div className="font-bold">Dr. Vance Gogh</div>
        <div className="text-sm">Radiologist</div>
      </div>
      <div>
        <button className="font-bold text-2xl">
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};

export default MessangerInfo;
