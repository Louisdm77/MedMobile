import React from "react";
import { TfiAngleRight } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div>
      <h2 className="homee font-semibold mb-1 mt-2 p-1">Privacy</h2>
      <div className=" shadow-lg bg-white p-3 rounded-md text-sm">
        <Link className="flex justify-between items-center ">
          <div>Change Password</div>
          <div>
            {" "}
            <button>
              <TfiAngleRight />
            </button>
          </div>
        </Link>
        <Link className="flex justify-between items-center mt-4">
          <div>Manage Data Permission</div>
          <div>
            <button>
              <TfiAngleRight />
            </button>
          </div>
        </Link>
        <div className="mt-4">
          <div>Logout of other devices</div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
