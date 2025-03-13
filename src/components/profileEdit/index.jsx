import React from "react";
import { Link } from "react-router-dom";



const EditProfile = () => {
  return (
    <div className="flex ml-4 relative justify-center">
      <div className="color rounded-full w-20 h-20 mr-10"></div>
      <div>
        <Link to="/profileEdit" className="border bod p-2 px-4 text-sm rounded-2xl absolute bottom-0 right-20 w-35" >Edit Profile</Link>
      </div>
    </div>
  );
};

export default EditProfile;
