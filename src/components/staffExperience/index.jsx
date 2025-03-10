import React from "react";

import { CiStar } from "react-icons/ci";

const StaffExperience = () => {
  const staffs = [
    "Dr Tobi Adedare",
    "Nr Sheldon Williams",
    "Mr James John",
    "Miss Imelda",
  ];
  const stars = Array.from({ length: 5 }, (_, index) => (
    <CiStar key={index} className="text-xl" />
  ));

  const experienceOptions = [
    "Friendly and Professional",
    "On time Appointment",
    "Clear Communication",
    "Helpful & Attentive",
  ];

  const experienceProblems = [
    "Long Waiting Time",
    "Rushed Consultation",
    "Unclear Communication",
    "Unfriendly Behaviour",
    "Inaccurate Diagnosis",
  ];
  return (
    <form className="w-[85%] bg-white p-4 shadow-md rounded-xl">
      <div className="p-2 ">
        <h2 className="font-semibold text-md mb-4">
          Share Your Experience with Our Staff
        </h2>
        <div className="">
          <label htmlFor="staffs" className="font-medium">
            Select the Staff or Department
          </label>{" "}
          <br />
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
        <div>
          {" "}
          <div className="p-3 homee">
            <label className="block font-medium ">When was your visit?</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="lastVisit"
                  id="today"
                  value="today"
                  className="mr-2 "
                />
                <label htmlFor="today" className="font-semibold">
                  Today
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="lastVisit"
                  id="yesterday"
                  value="yesterday"
                  className="mr-2 "
                />
                <label htmlFor="yesterday" className="font-semibold">
                  Yesterday
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="date"
                  name="lastVisitDate"
                  id="lastVisitDate"
                  className=" custom-date-input border border-gray-300 rounded-md homee mr-2"
                />
                <label htmlFor="lastVisitDate" className="font-semibold">
                  Custom
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-4">
          <h2 className="font text-sm">
            How would you rate your experience with ...?
          </h2>
          <div className="flex justify-center mt-3 space-x-6">{stars}</div>

          <div className="mt-6">
            <h2 className="font text-sm">
              What did you like about your experience?
            </h2>
            <div className="text-sm space-y-3 mt-2">
              {experienceOptions.map((exp) => (
                <div key={exp} className="flex items-center">
                  <input
                    type="checkbox"
                    name={exp}
                    id={exp}
                    className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={exp} className="text-sm">
                    {exp}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="font text-sm">What could have been better?</h2>
            <div className="text-sm mt-2">
              <div className="grid grid-rows-3 gap-3">
                {experienceProblems.map((exp, index) => (
                  <div
                    key={exp}
                    className={`
          flex items-center
          ${index === 2 ? "col-span-2 justify-start" : ""}
        `}
                  >
                    <input
                      type="checkbox"
                      name={exp}
                      id={exp}
                      className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={exp} className="text-sm">
                      {exp}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div>
              <h2 className="font-medium text-base">
                Would you like to share more details?
              </h2>
              <textarea
                placeholder="The nurse was great but waiting time was too long."
                className="w-full h-32 rounded-lg placeholder:text-xs mt-4 p-2 text-left resize-y border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="view text-white p-2 w-full rounded-lg mt-4 font-bold"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StaffExperience;
