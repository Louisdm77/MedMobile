import React from "react";
import { CiStar } from "react-icons/ci";

const AppExperience = () => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <CiStar key={index} className="text-xl" />
  ));
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
