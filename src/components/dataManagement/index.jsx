import React from "react";
import { Link } from "react-router-dom";

const DataManagement = () => {
  return (
    <div>
      <h2 className="homee font-semibold mb-1 mt-2 p-1">Data Management</h2>
      <div className="bg-white p-3 rounded-md text-sm">
        <Link className="flex justify-between items-center ">
          <p>Download My Data</p>
        </Link>
        <Link className="flex justify-between items-center mt-2 mb-2">
          <p>Clear App Cache</p>
        </Link>
        <Link className="">
          <p>Delete My Account</p>
        </Link>
      </div>
    </div>
  );
};

export default DataManagement;
