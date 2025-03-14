import React, { useState, useEffect, useCallback } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { getPatientData } from "../../repository/post.service";
import fetchPatientDetails from "../fetchPatientDetails";

const Header = () => {
  const { user, isLoading, setIsLoading, patientDetail, setPatientDetail } =
    useUserAuth();

  useEffect(() => {
    if (user) {
      fetchPatientDetails(user, setPatientDetail, setIsLoading);
    }
  }, [fetchPatientDetails]);
  useEffect(() => {
    console.log("patientDetail", patientDetail);
  }, [patientDetail]);

  return (
    <div>
      <div className="p-6 grid grid-cols-[35%_50%_10%] gap-4 items-center mt-2">
        <div>
          <h1 className="font-extrabold text-xl">
            Welcome, <span className="text-lg font-bold">{patientDetail.fullName || "Patient"}</span>
          </h1>
          <p className="font-medium">How may we be of help today?</p>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for medical records, doctors, or services"
            className="rounded-full w-full h-10  color border-none"
          />
          <button className="absolute right-3 top-3 text-xl color">
            <IoSearchOutline />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-gray-300 rounded-full p-4 text-lg color">
            <FaRegBell />
          </button>
          <button className="bg-gray-300 rounded-full p-4 text-lg color">
            <FaRegUser />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
