import React from "react";

const Emergency = () => {
  return (
    <div>
      <div className="bg-white rounded-lg  p-3 font-medium  mt-4">
        <div className="text-start">
          <h4 className="text-start text-md font-bold">Emergency Contact</h4>
          <p>Need urgent Care? Call your hospital now</p>
        </div>
        <button className="mt-2 border border-gray-700 w-full rounded-lg p-2">Call Now</button>
      </div>
    </div>
  );
};

export default Emergency;
