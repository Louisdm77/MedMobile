import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import Layout from "../../components/layout";
import StaffExperience from "../../components/staffExperience";
import AppExperience from "../../components/appExperience";

const Feedback = () => {
  return (
    <Layout>
      <div>
        {" "}
        <div className="p-4 grid grid-cols-[55%_30%_10%] gap-4 items-center mt-2 relative">
          <div>
            <h1 className="font-bold text-2xl">Feedback</h1>
            <p className="text-lg">Your feedback helps enhance our service.</p>
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
      <div className="grid grid-cols-[50%_40%] p-6 gap-8">
        <div className="">
          <StaffExperience />
        </div>
        <div>
          <AppExperience />
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
