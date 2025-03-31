import React from "react";
import { Link } from "react-router-dom";

const Customization = () => {
  return (
    <div>
      <h2 className="homee font-semibold mb-1 mt-2 p-1">App Customization</h2>
      <div className=" bg-white p-3 rounded-md text-sm">
        <Link className="flex justify-between items-center">
          <div>Font Size Adjustment</div>
        </Link>
        <Link className="flex justify-between items-center mt-4">
          <div>Theme Option</div>
        </Link>
      </div>
    </div>
  );
};

export default Customization;
