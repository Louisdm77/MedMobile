import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useUserAuth } from "../../assets/context/userAuthContext";

const Datee = () => {
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
    </div>
  );
};

export default Datee;
