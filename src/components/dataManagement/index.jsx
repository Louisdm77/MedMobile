import React from "react";

const DataManagement = () => {
  return (
    <div>
      <h2 className="homee font-semibold mb-1 mt-2 p-1">Data Management</h2>
      <div className=" shadow-lg bg-white p-3 rounded-md text-sm">
        <div className="flex justify-between items-center ">
          <div>
            <p>Download My Data</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p>Clear App Cache</p>
          </div>
        </div>
        <div className="mt-4">
          <div>
            <p>Delete My Account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
