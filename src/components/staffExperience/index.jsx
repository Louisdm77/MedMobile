import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { useUserAuth } from "../../assets/context/userAuthContext";
import Feedback from "../../pages/feedback";
import fetchPatientDetails from "../fetchPatientDetails";
import { updatePatientDetails } from "../../repository/post.service";

const StaffExperience = () => {
  const {
    staffExperience,
    setStaffExperience,
    appExperience,
    setAppExperience,
    patientDetail,
    setPatientDetail,
    user,
  } = useUserAuth();
  useEffect(() => {
    console.log(staffExperience);
    console.log(patientDetail);
  }, [staffExperience]);

  useEffect(() => {
    fetchPatientDetails(user, setPatientDetail, null);
  }, [user]);

  const staffs = [
    "Dr Tobi Adedare",
    "Nr Sheldon Williams",
    "Mr James John",
    "Miss Imelda",
  ];
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

  const handleStaff = (e) => {
    setStaffExperience((prev) => ({ ...prev, staff: e.target.value }));
  };

  const handleLastVisit = (e) => {
    setStaffExperience((prev) => ({ ...prev, lastVisit: e.target.value }));
  };

  const handleStarRating = (index) => {
    setStaffExperience((prev) => ({ ...prev, rating: index + 1 }));
  };
  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      className={`text-xl w-8 h-8 ${
        index < staffExperience.rating ? "text-yellow-400" : "text-gray-400"
      } hover:text-yellow-400 me-1`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
      onClick={() => handleStarRating(index)}
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  ));

  const handleStaffExperience = (e) => {
    const isChecked = e.target.checked;
    const inputVal = e.target.value;

    setStaffExperience((prev) => {
      if (isChecked) {
        return {
          ...prev,
          staffExperience: prev.staffExperience.includes(inputVal)
            ? prev.staffExperience
            : [...prev.staffExperience, inputVal],
        };
      } else {
        return {
          ...prev,
          staffExperience: prev.staffExperience.filter(
            (val) => val !== inputVal
          ),
        };
      }
    });
  };
  const handleSuggestion = (e) => {
    const isChecked = e.target.checked;
    const inputVal = e.target.value;

    setStaffExperience((prev) => {
      if (isChecked) {
        return {
          ...prev,
          suggestion: prev.suggestion.includes(inputVal)
            ? prev.suggestion
            : [...prev.suggestion, inputVal],
        };
      } else {
        return {
          ...prev,
          suggestion: prev.suggestion.filter((val) => val !== inputVal),
        };
      }
    });
  };

  const handleDetails = (e) => {
    setStaffExperience((prev) => ({ ...prev, details: e.target.value }));
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the new feedback entry
    const newFeedback = {
      appExperience,
      staffExperience,
      date: formattedDate,
    };

    // Update the patientDetail state
    setPatientDetail((prev) => ({
      ...prev,
      feedback: [...prev.feedback, newFeedback], // Add new feedback
    }));

    console.log("submitted");

    // Use the updated patientDetail for the database update
    try {
      // Fetch the latest patientDetail after the state update
      const updatedPatientDetail = {
        ...patientDetail,
        feedback: [...patientDetail.feedback, newFeedback],
      };

      await updatePatientDetails(updatedPatientDetail);
    } catch (err) {
      console.log(err);
    }
  };
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
            onChange={handleStaff}
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
                  onChange={handleLastVisit}
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
                  onChange={handleLastVisit}
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
                  onChange={handleLastVisit}
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
                    onChange={handleStaffExperience}
                    value={exp}
                    checked={
                      staffExperience.staffExperience
                        ? staffExperience.staffExperience.includes(exp)
                        : false
                    }
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
                      onChange={handleSuggestion}
                      value={exp}
                      checked={
                        staffExperience.suggestion
                          ? staffExperience.suggestion.includes(exp)
                          : false
                      }
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
                onChange={handleDetails}
              />
            </div>
            <button
              type="submit"
              className="view text-white p-2 w-full rounded-lg mt-4 font-bold"
              onClick={handleSubmit}
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
