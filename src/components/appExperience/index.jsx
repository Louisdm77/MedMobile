import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { useUserAuth } from "../../assets/context/userAuthContext";

const AppExperience = () => {
  const { appExperience, setAppExperience } = useUserAuth();
  useEffect(() => {
    console.log(appExperience);
  }, [appExperience]);
  const handleDifficultyOption = (e) => {
    setAppExperience((prev) => ({
      ...prev,
      difficult: e.target.value,
    }));
  };

  const handleStarRating = (index) => {
    setAppExperience((prev) => ({ ...prev, starRating: index + 1 }));
  };
  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      className={`text-xl w-8 h-8 ${
        index < appExperience.starRating ? "text-yellow-400" : "text-gray-400"
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
  const handleAppImprovementNote = (e) => {
    setAppExperience((prev) => ({ ...prev, improvement: e.target.value }));
  };
  return (
    <div>
      <form className="w-[85%]  p-4">
        <div className="mb-4">
          <h2 className="font-semibold text-md">
            Share Your Experience with Our App
          </h2>
        </div>
        <div className="w-full ">
          <h2 className="font text-sm">
            How was your experience with the app?
          </h2>
          <div className="flex justify-center mt-3 space-x-6">{stars}</div>
        </div>
        <div>
          <div className=" homee mt-4 ">
            <label className="font text-sm ">
              {" "}
              Did you face any difficulties using the app?
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="difficulties"
                  id="yes"
                  value="yes"
                  className="mr-2 color border-none"
                  onChange={handleDifficultyOption}
                />
                <label htmlFor="yes" className="font-light text-sm">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="difficulties"
                  id="no"
                  value="no"
                  className="mr-2 color border-none"
                  onChange={handleDifficultyOption}
                />
                <label htmlFor="no" className="font-light text-sm">
                  No, everything was smooth.
                </label>
              </div>
            </div>
            <div className="mt-6">
              <div>
                <h2 className="font-semibold text-base">
                  What can we improve?
                </h2>
                <textarea
                  onChange={handleAppImprovementNote}
                  placeholder="The app is slow at times."
                  className="w-full h-32 rounded-lg placeholder:text-xs mt-4 p-2 text-left resize-y border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppExperience;
