import React, { useState } from "react";
import Layout from "../../components/layout";
import Header from "../../components/header";
import Applications from "../../components/applications";
import MyDatePicker from "../../components/myDatePicker";
import Emergency from "../../components/emergency";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell, FaRegUser } from "react-icons/fa"; 
import { useUserAuth } from "../../assets/context/userAuthContext";
import BookAppointments from "../../components/bookAppointments";

const Appointments = () => {
  return (
    <div>
      <Layout>
        <div className={`w-full `}>
          <div>
            <div className="p-4 grid grid-cols-[55%_30%_10%] gap-4 items-center mt-2">
              <div>
                <h1 className="font-bold text-2xl">Appointments</h1>
                <p className="">Manage and track your medical appointments.</p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full w-full h-10 p-2 color border-none"
                />
                <button className="absolute right-3 top-3 text-xl ">
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
          <div className="flex ">
            <div className="w-[60%]">
              <Applications />
            </div>
            <div>
              <BookAppointments />
            </div>
            <div className="w-[37%] p-2">
              <MyDatePicker />
              <Emergency />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Appointments;
