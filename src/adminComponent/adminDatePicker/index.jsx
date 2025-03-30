import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useUserAuth } from "../../assets/context/userAuthContext";

const MyDatePicker = () => {
  const [selected, setSelected] = useState();
  const { clicked, view, setView } = useUserAuth();
  const handleView = () => {
    setView(true);
  };
  return (
    <div className="relative  h-auto flex flex-col rounded-lg bg-white  ">
      <div className="w-full flex justify-center w-full">
        {" "}
        {/* Added this wrapper div */}
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          className="" // Removed w-full from here
        />
      </div>

      <button className="m-2 border border-2 border-gray-700 view text-white  rounded-2xl p-2">
        View Appointments
      </button>

      <button className="m-2 mt-1 border border-2 border-blue-700  rounded-2xl p-2 homee ">
        Create Appointment
      </button>
    </div>
  );
};

export default MyDatePicker;
