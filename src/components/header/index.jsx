import React, { useState, useEffect, useCallback } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { getPatientData } from "../../repository/post.service";

const Header = () => {
  const { clicked, data, setData, user } = useUserAuth();
  const [patientDetail, setPatientDetail] = useState({});

  const fetchPatientDetails = useCallback(async () => {
    if (user) {
      try {
        const querySnapshot = await getPatientData(user.uid);
        if (querySnapshot.exists()) {
          const patientData = querySnapshot.data();
          setPatientDetail(patientData);
        } else {
          console.log("No patient data found");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchPatientDetails();
  }, [fetchPatientDetails]);

  return (
    <div>
      <div className="p-6 grid grid-cols-[25%_60%_10%] gap-4 items-center mt-4">
        <div>
          <h1 className="font-extrabold text-2xl">
            Welcome, {patientDetail.fullName}
          </h1>
          <p className="font-medium">How may we be of help today?</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="rounded-full w-full h-10 p-2 bg-gray-300"
          />
          <button className="absolute right-3 top-3 text-xl">
            <IoSearchOutline />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-gray-300 rounded-full p-4 text-lg">
            <FaRegBell />
          </button>
          <button className="bg-gray-300 rounded-full p-4 text-lg">
            <FaRegUser />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
