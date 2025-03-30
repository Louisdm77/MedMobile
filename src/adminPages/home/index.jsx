import React, { useEffect } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../adminComponent/layout";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import AdminData from "../../adminComponent/adminData";
import AppointmentsInfo from "../../adminComponent/appointmentsInfo";
import Datee from "../../adminComponent/date";
import TodaysAppointments from "../../adminComponent/todaysAppointment";
import ChatPreview from "../../adminComponent/homeChatPreview";

const AdminHome = () => {
  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <AdminLayout>
        <div>
          <div>
            {" "}
            <div className="p-4 grid grid-cols-[55%_30%_10%] gap-4 items-center mt-2 relative">
              <div>
                <h1 className="font-semibold text-xl">
                  Good morning, Dr. {user.displayName}
                </h1>
                <p className="text-lg">Here's your schedule for today.</p>
              </div>{" "}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full w-full h-10 p-2 color border-none"
                />
                <button className="absolute right-3 top-3 text-xl">
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

          <div className="grid grid-cols-[65%_35%] gap-2 p-6">
            <div>
              <div className="grid grid-cols-2  gap-4">
                <AdminData />
                <AppointmentsInfo />
              </div>
              <div>
                <TodaysAppointments />
              </div>
            </div>
            <div>
              <div>
                <Datee />
                <ChatPreview />
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminHome;
