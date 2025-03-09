import React from "react";
import VisitDate from "../visitDate";
import Experience from "../experience";

const StaffExperience = () => {
  const staffs = [
    "Dr Tobi Adedare",
    "Nr Sheldon Williams",
    "Mr James John",
    "Miss Imelda",
  ];
  return (
    <div className="w-[85%] bg-white p-4 ">
      <div className="p-2 ">
        <h2 className="font-semibold">Share Your Experience with Our Staff</h2>
        <div className="mt-4 p-4">
          <label htmlFor="staffs" className="font-medium">Select the Staff or Department</label> <br />
          <select
            name="staffs"
            id="staffs"
            className="w-full rounded-lg border border-2 border-black"
          >
            <option value="" disabled selected className="text-gray-200 italic">
              e.g. James Doe
            </option>
            {staffs.map((staff, index) => {
              return (
                <option key={staff} value={staff}>
                  {staff}
                </option>
              );
            })}
          </select>
        </div>
        <VisitDate />
        <Experience />
      </div>
    </div>
  );
};

export default StaffExperience;
