import React from "react";
import Layout from "../../adminComponent/layout";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import MyDatePicker from "../../components/myDatePicker";
import Emergency from "../../components/emergency";
import BookAppointments from "../../components/bookAppointments";
import AdminApplications from "../../adminComponent/adminApplications";

const AdminAppointments = () => {
  return (
    <div>
      <Layout>
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
            <AdminApplications />
          </div>
          <div>
            <BookAppointments />
          </div>
          <div className="w-[37%] p-2">
            <MyDatePicker />
            <Emergency />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminAppointments;
