import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useUserAuth } from "../../assets/context/userAuthContext";

const MyDatePicker = () => {
  const [selected, setSelected] = useState();
  const { clicked } = useUserAuth();

  return (
    <div className="relative w-full h-auto flex flex-col rounded-lg bg-white  ">
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
      {clicked === "Home" && (
        <button className="m-2 border border-2 border-gray-700  rounded-lg p-2">
          Check Appointments
        </button>
      )}
      {clicked === "Appointments" && (
        <button className="m-2 border border-2 border-blue-700  rounded-lg p-2 homee ">
          Book New Appointment
        </button>
      )}
    </div>
  );
};

export default MyDatePicker;
