import React from "react";

const VisitDate = () => {
  return (
    <div>
      {" "}
      <div className="p-3 homee">
        <label className="block font-medium ">
          When was your visit?
        </label>
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
  );
};

export default VisitDate;
