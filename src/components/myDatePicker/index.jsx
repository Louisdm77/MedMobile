import React from "react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useUserAuth } from "../../assets/context/userAuthContext";

const MyDatePicker = () => {
  const [selected, setSelected] = useState();
  const { clicked } = useUserAuth();

  return (
    <div className="bg-gray-200 p-2 relative w-full flex flex-col justify-items rounded-lg">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        // footer={
        //   selected
        //     ? `Selected: ${selected.toLocaleDateString()}`
        //     : "Pick a day."
        // }
        className="pl-8"
      />
      {clicked === "Home" && (
        <button className="mt-2 border border-gray-700 w-full rounded-lg p-2">
          Check Appointments
        </button>
      )}{" "}
      {clicked === "Appointment" && (
        <button className="mt-2 border border-gray-700 w-full rounded-lg p-2">
          Book New Appointment
        </button>
      )}
    </div>
  );
};
export default MyDatePicker;
