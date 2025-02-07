import React from "react";
import { PiNotepadLight } from "react-icons/pi";
import { PiPill } from "react-icons/pi";
import { PiStethoscope } from "react-icons/pi";
import { Link } from "react-router-dom";

const PatientInfo = () => {
  const patientInfo = [
    { name: "Blood Group", value: "O+" },
    { name: "Genotype", value: "AA" },
    { name: "Weight", value: "77kg" },
    { name: "Height", value: "6'2" },
    { name: "Medical Conditions", value: ["Diabetes", "HBP"] },
    { name: "Alergies", value: "None" },
  ];

  const patientRecord = [
    {
      name: "Medical Information",
      icon: <PiNotepadLight />,
      link: "#",
    },
    {
      name: "Prescriptions",
      icon: <PiPill />,
      link: "#",
    },
    {
      name: "Lab Results",
      icon: <PiStethoscope />,
      link: "#",
    },
  ];
  return (
    <div>
      <div className="w-full p-4">
        <div className="bg-gray-300 flex items-center justify-between p-4 rounded-lg">
          <div>
            <h2 className="font-bold text-2xl">Patient Information</h2>
            <ul className="grid grid-cols-2 gap-4 text-base font-medium p-1">
              {patientInfo.map((info, index) => {
                if (Array.isArray(info.value)) {
                  return (
                    <li key={index} className="border-b mt-2">
                      {info.name}: &nbsp;
                      {info.value.map((val, index) => val).join(", ")}
                    </li>
                  );
                } else {
                  return (
                    <li key={index} className="border-b mt-2">
                      {info.name}: &nbsp;{info.value}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {patientRecord.map((rec, index) => {
            return (
              <Link to={rec.link}>
                <div className="bg-gray-300 rounded-lg text-center h-40 text-3xl font-medium flex flex-col items-center justify-center">
                  <div className="text-center">{rec.icon}</div>
                  <h3 className="mt-2">{rec.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
