import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import EditProfile from "../../components/profileEdit";
import PatientContactDetails from "../../components/patientContactDetails";
import { useUserAuth } from "../../assets/context/userAuthContext";
import EmergencyContactDetails from "../../components/emergencyContactDetails";
import Emergency from "../../components/emergency";
const Profile = () => {
  const { patientDetail } = useUserAuth();
  useEffect(() => {
    console.log("patiennnttt::", patientDetail);
  });
  return (
    <div>
      <Layout>
        <div className="w-full">
          <div>
            <div className="p-4 grid grid-cols-[55%_30%_10%] gap-4 items-center mt-2">
              <div>
                <h1 className="font-bold text-2xl">Profile</h1>
                <p className="text-lg">
                  Manage and track your medical appointments.
                </p>
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
          <div className="grid grid-cols-2 p-4 ">
            <div className="">
              <EditProfile />
              <PatientContactDetails />
            </div>
            <div>
              <EmergencyContactDetails className="mt-0"/>
              <Emergency/>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
