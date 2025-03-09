import React from "react";
import { CiStar } from "react-icons/ci";

const Experience = () => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <CiStar key={index} className="text-xl" />
  ));

  const experienceOptions = [
    "Friendly and Professional",
    "On time Appointment",
    "Clear Communication",
    "Helpful & Attentive",
  ];

  return (
    <div className="w-full p-4">
      <h2 className="font text-lg md:text-xl">
        How would you rate your experience with ...?
      </h2>
      <div className="flex justify-center mt-3 space-x-6">{stars}</div>

      <div className="mt-6">
        <h2 className="font text-lg md:text-xl">
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
              <label htmlFor={exp} className="">
                {exp}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
