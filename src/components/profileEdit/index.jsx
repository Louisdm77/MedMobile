import React from "react";
// import { Link } from "react-router-dom";
import { useUserAuth } from "../../assets/context/userAuthContext";
import dp from "../../assets/images/doc.jpg";

const EditProfile = () => {
  const { editProfile, setEditProfile } = useUserAuth();
  return (
    <div className="flex ml-4 relative justify-center">
      <div className=" rounded-full w-25 h-25 mr-10">
        <img src={dp} alt="" className="h-full w-full rounded-full" />
      </div>
      <div>
        <button
          to=""
          className="border bod p-2 px-4 text-sm rounded-2xl absolute bottom-0 right-20 w-35"
          onClick={() => {
            setEditProfile(true);
          }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
